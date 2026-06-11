// POST /api/confirm-purchase  body: { session_id }
// 購入直後のリダイレクトで呼ばれ、Stripe に問い合わせて当該セッションが
// 実際に支払い済みかをサーバー検証する。URL の細工だけでは突破できない。
// 支払い済みなら customers.paid=true を冪等に更新し { ok:true, email } を返す。

import { stripe } from './lib/stripe.js';
import { supabaseAdmin } from './lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.body || {};
    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ error: 'session_id is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== 'paid') {
      return res.status(402).json({ ok: false, error: 'Payment not completed' });
    }

    const email = (session.customer_email || session.customer_details?.email || '')
      .trim()
      .toLowerCase();

    // 支払いを確定（webhookが先行していても冪等）。
    // DB更新は副次的なので、失敗してもアクセス付与は妨げない（移行前後でも購入導線が壊れない）。
    try {
      const patch = {
        paid: true,
        paid_at: new Date().toISOString(),
        stripe_session_id: session.id,
      };
      if (email) {
        await supabaseAdmin.from('customers').update(patch).eq('email', email);
      } else if (session.metadata?.customer_id) {
        await supabaseAdmin.from('customers').update(patch).eq('id', session.metadata.customer_id);
      }
    } catch (dbErr) {
      console.error('[confirm-purchase] DB update failed (access still granted):', dbErr);
    }

    // Stripe で支払い確認済みなのでアクセスを許可
    return res.status(200).json({ ok: true, email });
  } catch (err) {
    console.error('[confirm-purchase] error:', err);
    return res.status(500).json({ ok: false, error: err.message || 'Internal error' });
  }
}

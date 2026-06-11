// POST /api/stripe-webhook
// Stripe からの checkout.session.completed を受信し、署名検証のうえ
// customers.paid=true をサーバー側で確定させる（権威ある支払い記録）。
// Vercel では生のリクエストボディが必要なため bodyParser を無効化する。

import { stripe } from './lib/stripe.js';
import { supabaseAdmin } from './lib/supabase.js';

export const config = {
  api: { bodyParser: false },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

async function markPaid({ email, sessionId, customerId }) {
  const patch = {
    paid: true,
    paid_at: new Date().toISOString(),
    stripe_session_id: sessionId || null,
  };
  // email を優先（customer_email でマッチ）。無ければ metadata.customer_id で更新。
  if (email) {
    const { error } = await supabaseAdmin
      .from('customers')
      .update(patch)
      .eq('email', String(email).trim().toLowerCase());
    if (error) throw error;
    return;
  }
  if (customerId) {
    const { error } = await supabaseAdmin
      .from('customers')
      .update(patch)
      .eq('id', customerId);
    if (error) throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event;
  try {
    const raw = await readRawBody(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // 支払い済みのみ確定
      if (session.payment_status === 'paid') {
        await markPaid({
          email: session.customer_email || session.customer_details?.email,
          sessionId: session.id,
          customerId: session.metadata?.customer_id,
        });
      }
    }
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[webhook] handler error:', err);
    // 失敗時は500を返し Stripe にリトライさせる
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}

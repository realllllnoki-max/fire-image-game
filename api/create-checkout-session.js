// POST /api/create-checkout-session
// Creates a Stripe Checkout Session for the one-time 980 JPY purchase.
// Also upserts the customer (with marketing consent) into Supabase.

import { stripe } from './_lib/stripe.js';
import { supabaseAdmin } from './_lib/supabase.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRICE_JPY = parseInt(process.env.VITE_PRODUCT_PRICE_JPY || '980', 10);
const PRODUCT_NAME = process.env.VITE_PRODUCT_NAME || 'FIRE Conference Access';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, marketingConsent, agreedTerms, agreedPrivacy } = req.body || {};

    // --- Validation ---
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    if (!agreedTerms || !agreedPrivacy) {
      return res
        .status(400)
        .json({ error: 'You must agree to the Terms and Privacy Policy' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const consent = !!marketingConsent;

    // --- 1. Upsert customer in Supabase ---
    const { data: customer, error: upsertError } = await supabaseAdmin
      .from('customers')
      .upsert(
        {
          email: normalizedEmail,
          marketing_consent: consent,
          marketing_consent_at: consent ? new Date().toISOString() : null,
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (upsertError) {
      console.error('[checkout] supabase upsert error:', upsertError);
      return res.status(500).json({ error: 'Database error' });
    }

    // --- 2. Create Stripe Checkout Session ---
    const origin =
      req.headers.origin ||
      (req.headers.host ? `https://${req.headers.host}` : 'https://fire-conference.vercel.app');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: normalizedEmail,
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: PRODUCT_NAME,
              description: '消防士向け研修コンテンツへの永続アクセス権（買い切り）',
            },
            unit_amount: PRICE_JPY,
          },
          quantity: 1,
        },
      ],
      metadata: {
        customer_id: customer.id,
        marketing_consent: String(consent),
      },
      success_url: `${origin}/?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?purchase=cancelled`,
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('[checkout] error:', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}

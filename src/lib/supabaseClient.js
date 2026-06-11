// ブラウザ用 Supabase クライアント（公開可能キー）。
// マジックリンク認証のセッション管理に使用する。
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// 環境変数が無い場合でもビルド/描画が落ちないよう null を許容
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true, // マジックリンクの戻りURLからセッションを確立
        },
      })
    : null;

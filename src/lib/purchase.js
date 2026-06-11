// アクセス権の管理
// - localStorage: 「サーバー検証済み」のキャッシュ（高速判定）
// - サーバー検証: /api/confirm-purchase（Stripe検証）と Supabase の paid フラグ
import { supabase } from "@/lib/supabaseClient";

const STORAGE_KEY = "fire-conference-access";

export function hasAccess() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

export function grantAccess(sessionId) {
  try {
    localStorage.setItem(STORAGE_KEY, "granted");
    if (sessionId) localStorage.setItem(`${STORAGE_KEY}-session`, sessionId);
  } catch {
    // localStorage unavailable
  }
}

export function revokeAccess() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}-session`);
  } catch {
    // noop
  }
}

// 購入直後のリダイレクトを処理。?purchase=success&session_id=... を受け取り、
// /api/confirm-purchase で Stripe にサーバー検証してから access を付与する。
// URL の細工だけでは付与されない。
export async function checkPurchaseRedirect() {
  if (typeof window === "undefined") return { status: "idle" };
  const params = new URLSearchParams(window.location.search);
  const purchase = params.get("purchase");
  const sessionId = params.get("session_id");

  if (purchase === "success" && sessionId) {
    // URL を先にクリーン（再読込時の二重処理防止）
    window.history.replaceState({}, "", window.location.pathname);
    try {
      const res = await fetch("/api/confirm-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        grantAccess(sessionId);
        return { status: "success", email: data.email };
      }
      return { status: "unverified" };
    } catch {
      return { status: "error" };
    }
  }
  if (purchase === "cancelled") {
    window.history.replaceState({}, "", window.location.pathname);
    return { status: "cancelled" };
  }
  return { status: "idle" };
}

// ログイン済みユーザーが「支払い済み」かを Supabase（RLSで自分の行のみ）で確認。
// どの端末でもログインすればアクセスを復元できる。
export async function checkRemoteAccess() {
  if (!supabase) return false;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return false;
    const { data, error } = await supabase
      .from("customers")
      .select("paid")
      .eq("email", session.user.email)
      .maybeSingle();
    if (error) return false;
    return !!data?.paid;
  } catch {
    return false;
  }
}

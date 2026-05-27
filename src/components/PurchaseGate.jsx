import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Lock, Shield, Mail } from "lucide-react";

const PRICE = import.meta.env.VITE_PRODUCT_PRICE_JPY || "980";
const PRODUCT_NAME = import.meta.env.VITE_PRODUCT_NAME || "FIRE Conference アクセス権";

export default function PurchaseGate() {
  const [email, setEmail] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = emailValid && agreedTerms && agreedPrivacy && !loading;

  const handleCheckout = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          marketingConsent,
          agreedTerms,
          agreedPrivacy,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "セッション作成に失敗しました");
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)", padding: "40px 16px" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Flame size={48} color="#f97316" style={{ margin: "0 auto" }} />
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginTop: 12 }}>FIRE Conference</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>消防士向け研修シミュレーション</p>
        </div>

        <Card style={{ background: "#1e293b", border: "1px solid #334155", color: "#f1f5f9" }}>
          <CardHeader>
            <CardTitle style={{ color: "#f1f5f9", display: "flex", alignItems: "center", gap: 8 }}>
              <Lock size={20} color="#f97316" />
              アクセス購入
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ textAlign: "center", padding: "16px 0", borderBottom: "1px solid #334155", marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: "#94a3b8" }}>{PRODUCT_NAME}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#f97316", marginTop: 4 }}>
                ¥{PRICE}
                <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 400, marginLeft: 6 }}>買い切り・税込</span>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, color: "#cbd5e1", marginBottom: 6 }}>
                <Mail size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "#0f172a",
                  border: `1px solid ${email && !emailValid ? "#ef4444" : "#475569"}`,
                  borderRadius: 6,
                  color: "#f1f5f9",
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
              />
              {email && !emailValid && (
                <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>有効なメールアドレスを入力してください</div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16, fontSize: 13 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", color: "#cbd5e1" }}>
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  disabled={loading}
                  style={{ marginTop: 2, cursor: "pointer" }}
                />
                <span>
                  <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#f97316", textDecoration: "underline" }}>
                    利用規約
                  </a>
                  に同意する <span style={{ color: "#ef4444" }}>*</span>
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", color: "#cbd5e1" }}>
                <input
                  type="checkbox"
                  checked={agreedPrivacy}
                  onChange={(e) => setAgreedPrivacy(e.target.checked)}
                  disabled={loading}
                  style={{ marginTop: 2, cursor: "pointer" }}
                />
                <span>
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#f97316", textDecoration: "underline" }}>
                    プライバシーポリシー
                  </a>
                  に同意する <span style={{ color: "#ef4444" }}>*</span>
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", color: "#cbd5e1" }}>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  disabled={loading}
                  style={{ marginTop: 2, cursor: "pointer" }}
                />
                <span>新着情報・コンテンツ更新のメール配信を受け取る（任意）</span>
              </label>
            </div>

            {error && (
              <div style={{ background: "#7f1d1d", color: "#fecaca", padding: "10px 12px", borderRadius: 6, fontSize: 13, marginBottom: 12 }}>
                {error}
              </div>
            )}

            <Button
              onClick={handleCheckout}
              disabled={!canSubmit}
              style={{
                width: "100%",
                background: canSubmit ? "#f97316" : "#475569",
                color: "#fff",
                border: "none",
                padding: "12px",
                fontSize: 15,
                fontWeight: 600,
                cursor: canSubmit ? "pointer" : "not-allowed",
                borderRadius: 6,
              }}
            >
              {loading ? "処理中…" : `購入して開始（¥${PRICE}）`}
            </Button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, fontSize: 11, color: "#64748b" }}>
              <Shield size={12} />
              <span>決済は Stripe（PCI DSS Level 1認証）で安全に処理されます</span>
            </div>
          </CardContent>
        </Card>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 11 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", textDecoration: "underline" }}>利用規約</a>
            <span style={{ color: "#475569" }}>·</span>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", textDecoration: "underline" }}>プライバシーポリシー</a>
            <span style={{ color: "#475569" }}>·</span>
            <a href="/tokushoho" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", textDecoration: "underline" }}>特定商取引法に基づく表記</a>
          </div>
          <p style={{ color: "#64748b", margin: 0 }}>
            © FIRE Conference. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

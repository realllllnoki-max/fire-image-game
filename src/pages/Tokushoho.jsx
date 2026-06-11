// 特定商取引法に基づく表記ページ
// 個人事業主向け「請求があれば遅滞なく開示」方式
// プレースホルダー [ご本名を記入] [連絡先メール] は公開前に置き換えてください
import { Flame } from "lucide-react";

export default function Tokushoho() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#f97316", textDecoration: "none" }}>
            <Flame size={24} />
            <span style={{ fontSize: 20, fontWeight: 700 }}>FIRE Conference</span>
          </a>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#fff" }}>特定商取引法に基づく表記</h1>
        <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 32 }}>最終更新日: 2026年5月27日</p>

        <div style={{ background: "#1e293b", borderRadius: 8, overflow: "hidden", border: "1px solid #334155" }}>
          <Row label="販売事業者">
            楠木善昭
          </Row>
          <Row label="所在地">
            ご請求頂いた場合、遅滞なく開示いたします。
          </Row>
          <Row label="電話番号">
            ご請求頂いた場合、遅滞なく開示いたします。
            <br />
            <span style={{ color: "#94a3b8", fontSize: 12 }}>※お問い合わせは原則メールにてお願いいたします。</span>
          </Row>
          <Row label="メールアドレス">
            <a href="mailto:kusunoki.yoshiaki11120614@gmail.com" style={{ color: "#f97316", textDecoration: "underline", fontFamily: "monospace" }}>
              kusunoki.yoshiaki11120614@gmail.com
            </a>
          </Row>
          <Row label="運営統括責任者">
            楠木善昭
          </Row>
          <Row label="販売価格">
            ¥980（税込）
          </Row>
          <Row label="商品代金以外の必要料金">
            なし
            <br />
            <span style={{ color: "#94a3b8", fontSize: 12 }}>※インターネット接続料金、通信費等はお客様のご負担となります。</span>
          </Row>
          <Row label="支払方法">
            クレジットカード決済（Stripe）
            <br />
            <span style={{ color: "#94a3b8", fontSize: 12 }}>Visa / Mastercard / American Express / JCB / Diners Club / Discover</span>
          </Row>
          <Row label="支払時期">
            購入手続き時に即時決済
          </Row>
          <Row label="商品の引渡時期">
            決済完了後、ただちにアクセス権が付与されます。
          </Row>
          <Row label="商品の内容">
            消防士向け図上訓練シミュレーションコンテンツ「FIRE Conference」への永続アクセス権（買い切り）
          </Row>
          <Row label="返品・交換・キャンセル">
            <span style={{ color: "#fbbf24", fontWeight: 600 }}>
              デジタルコンテンツの性質上、購入後のキャンセル・返品・返金には一切応じられません。
            </span>
            <br />
            購入前に商品内容・利用規約を十分にご確認ください。
          </Row>
          <Row label="動作環境" last>
            <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.8 }}>
              <li>最新のWebブラウザ（Chrome / Edge / Safari / Firefox 推奨）</li>
              <li>JavaScriptを有効化していること</li>
              <li>インターネット接続環境</li>
              <li>PDF閲覧可能な環境（PDF出力機能をご利用の場合）</li>
            </ul>
          </Row>
        </div>

        <div style={{ marginTop: 32, padding: 16, background: "#1e293b", borderRadius: 8, border: "1px solid #334155", fontSize: 13, lineHeight: 1.8 }}>
          <p style={{ margin: 0, color: "#94a3b8" }}>
            <strong style={{ color: "#fff" }}>住所・電話番号の開示請求について</strong>
            <br />
            本表記における所在地および電話番号について、開示をご希望のお客様は、
            上記メールアドレスまでお問い合わせください。ご請求があり次第、遅滞なく開示いたします。
            <br />
            （特定商取引法施行規則第23条に基づく対応）
          </p>
        </div>

        <div style={{ marginTop: 32, fontSize: 13, color: "#94a3b8" }}>
          <p>関連する規約・ポリシー:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li><a href="/terms" style={linkStyle}>利用規約</a></li>
            <li><a href="/privacy" style={linkStyle}>プライバシーポリシー</a></li>
          </ul>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #334155", textAlign: "center" }}>
          <a href="/" style={{ color: "#f97316", textDecoration: "underline", fontSize: 14 }}>← トップに戻る</a>
        </div>
      </div>
    </div>
  );
}

const linkStyle = { color: "#f97316", textDecoration: "underline" };

function Row({ label, children, last }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      gap: 16,
      padding: "14px 20px",
      borderBottom: last ? "none" : "1px solid #334155",
      fontSize: 14,
    }}>
      <div style={{ color: "#94a3b8", fontWeight: 600 }}>{label}</div>
      <div style={{ color: "#e2e8f0", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

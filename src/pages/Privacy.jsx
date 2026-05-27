// プライバシーポリシーページ
// プレースホルダー [ご本名を記入] [連絡先メール] は公開前に置き換えてください
import { Flame } from "lucide-react";

export default function Privacy() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#f97316", textDecoration: "none" }}>
            <Flame size={24} />
            <span style={{ fontSize: 20, fontWeight: 700 }}>FIRE Conference</span>
          </a>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#fff" }}>プライバシーポリシー</h1>
        <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 32 }}>最終更新日: 2026年5月27日</p>

        <Section title="1. はじめに">
          <p>FIRE Conference（以下「本サービス」）は、利用者のプライバシーを尊重し、個人情報の保護に最大限の注意を払います。本プライバシーポリシーは、本サービスにおける個人情報の取扱いについて定めるものです。</p>
        </Section>

        <Section title="2. 収集する個人情報">
          <p>本サービスでは、以下の個人情報を取得することがあります。</p>
          <ol style={olStyle}>
            <li><strong>メールアドレス</strong>: 購入時に利用者が入力</li>
            <li><strong>決済情報</strong>: クレジットカード番号等は当社では保持せず、Stripe社に直接送信されます</li>
            <li><strong>購入履歴</strong>: 購入日時、商品、金額</li>
            <li><strong>マーケティング同意状態</strong>: 利用者の選択に基づく</li>
            <li><strong>アクセスログ</strong>: IPアドレス、ブラウザ情報、アクセス日時等</li>
          </ol>
        </Section>

        <Section title="3. 個人情報の利用目的">
          <p>取得した個人情報は、以下の目的で利用します。</p>
          <ol style={olStyle}>
            <li>本サービスの提供・運営・アクセス権の管理</li>
            <li>決済処理および購入確認の連絡</li>
            <li>お問い合わせへの対応</li>
            <li>新機能・コンテンツ更新等のお知らせ送信（マーケティング同意者のみ）</li>
            <li>サービス改善のための分析</li>
            <li>不正利用の防止・調査</li>
            <li>法令に基づく対応</li>
          </ol>
        </Section>

        <Section title="4. 第三者提供・委託">
          <p>運営者は、以下の場合を除き、利用者の個人情報を第三者に提供しません。</p>
          <ol style={olStyle}>
            <li>利用者の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要な場合</li>
          </ol>
          <p style={{ marginTop: 12 }}>また、以下の業務委託先には、サービス運営のため必要な範囲で個人情報を提供します。</p>
          <ol style={olStyle}>
            <li><strong>Stripe, Inc.</strong>（決済処理）— <a href="https://stripe.com/jp/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>プライバシーポリシー</a></li>
            <li><strong>Supabase, Inc.</strong>（顧客データベース）— <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>プライバシーポリシー</a></li>
            <li><strong>Vercel, Inc.</strong>（ホスティング）— <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>プライバシーポリシー</a></li>
          </ol>
        </Section>

        <Section title="5. マーケティングメールについて">
          <p>運営者は、購入時に「マーケティング情報の受信に同意する」を選択した利用者に対してのみ、新着情報・コンテンツ更新等のメールを配信することがあります。</p>
          <ol style={olStyle}>
            <li>同意は任意であり、未同意でも本サービスは利用できます</li>
            <li>配信を希望しない場合は、各メールの購読解除リンク、または下記連絡先までご連絡いただければ即時停止します</li>
            <li>運営者は特定電子メール法に基づき、適正な配信を行います</li>
          </ol>
        </Section>

        <Section title="6. 個人情報の保管期間">
          <p>取得した個人情報は、利用目的の達成に必要な期間、または法令で定められた期間、安全に保管します。利用者から削除請求があった場合は、法令で保管義務がある情報を除き、速やかに削除します。</p>
        </Section>

        <Section title="7. 安全管理措置">
          <p>運営者は、個人情報の漏洩、滅失または毀損の防止のため、以下の措置を講じます。</p>
          <ol style={olStyle}>
            <li>SSL/TLSによる通信の暗号化</li>
            <li>データベースへのアクセス制限（Row Level Security）</li>
            <li>シークレットキー類の厳重管理</li>
            <li>業務委託先の選定における安全管理水準の確認</li>
          </ol>
        </Section>

        <Section title="8. 利用者の権利">
          <p>利用者は、運営者が保有する自己の個人情報について、以下の権利を有します。</p>
          <ol style={olStyle}>
            <li>開示請求</li>
            <li>訂正・追加・削除の請求</li>
            <li>利用停止の請求</li>
            <li>第三者提供の停止請求</li>
          </ol>
          <p style={{ marginTop: 12 }}>これらの権利を行使したい場合は、下記の連絡先までご連絡ください。本人確認のうえ、遅滞なく対応いたします。</p>
        </Section>

        <Section title="9. Cookieの使用">
          <p>本サービスでは、利用者の利便性向上のためCookie等の技術を使用することがあります。</p>
          <ol style={olStyle}>
            <li><strong>localStorage</strong>: 購入済みアクセス権の判定に使用</li>
            <li><strong>Stripe Cookie</strong>: 決済セキュリティのため、Stripe社が設定</li>
          </ol>
          <p style={{ marginTop: 12 }}>ブラウザ設定でCookieを無効にすることもできますが、本サービスの一部機能が利用できなくなる場合があります。</p>
        </Section>

        <Section title="10. プライバシーポリシーの変更">
          <p>運営者は、法令の変更やサービス内容の変更に応じて、本プライバシーポリシーを変更することがあります。変更後の内容は、本サービス上に掲載した時点で効力を生じます。</p>
        </Section>

        <Section title="11. お問い合わせ窓口">
          <p>個人情報の取扱いに関するご質問、開示請求等は以下の窓口までご連絡ください。</p>
          <div style={{ background: "#1e293b", padding: 16, borderRadius: 6, marginTop: 12 }}>
            <p style={{ margin: "4px 0" }}><strong>運営者</strong>: [ご本名を記入]</p>
            <p style={{ margin: "4px 0" }}><strong>連絡先</strong>: <span style={{ fontFamily: "monospace" }}>[連絡先メール]</span></p>
          </div>
        </Section>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #334155", textAlign: "center" }}>
          <a href="/" style={{ color: "#f97316", textDecoration: "underline", fontSize: 14 }}>← トップに戻る</a>
        </div>
      </div>
    </div>
  );
}

const olStyle = { paddingLeft: 24, margin: "8px 0", lineHeight: 1.8 };
const linkStyle = { color: "#f97316", textDecoration: "underline" };

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #334155" }}>{title}</h2>
      <div style={{ fontSize: 14, lineHeight: 1.8, color: "#cbd5e1" }}>{children}</div>
    </section>
  );
}

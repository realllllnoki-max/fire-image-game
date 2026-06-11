// 利用規約ページ
// プレースホルダー [ご本名を記入] [連絡先メール] は公開前に置き換えてください
import { Flame } from "lucide-react";

export default function Terms() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#f97316", textDecoration: "none" }}>
            <Flame size={24} />
            <span style={{ fontSize: 20, fontWeight: 700 }}>FIRE Conference</span>
          </a>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#fff" }}>利用規約</h1>
        <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 32 }}>最終更新日: 2026年5月27日</p>

        <Section title="第1条（適用）">
          <p>本利用規約（以下「本規約」）は、FIRE Conference（以下「本サービス」）の提供条件および本サービスの利用に関する運営者と利用者との間の権利義務関係を定めるものです。利用者は、本規約に同意したうえで本サービスを利用するものとします。</p>
        </Section>

        <Section title="第2条（本サービスの内容）">
          <p>本サービスは、消防士向けの図上訓練（タブレットトップエクササイズ）シミュレーションコンテンツへのアクセス権を提供します。買い切り型のデジタルコンテンツであり、購入後は永続的に利用可能です（ただし、サービス提供継続中に限ります）。</p>
        </Section>

        <Section title="第3条（料金および支払方法）">
          <ol style={olStyle}>
            <li>本サービスの利用料金は ¥980（税込）の買い切りです。</li>
            <li>支払方法はクレジットカード決済（Stripe）のみです。</li>
            <li>支払時期は購入手続き時とし、決済完了後ただちにアクセス権が付与されます。</li>
          </ol>
        </Section>

        <Section title="第4条（返品・返金）">
          <p style={{ fontWeight: 600, color: "#fbbf24" }}>本サービスはデジタルコンテンツの性質上、いかなる理由があっても返品・返金には応じられません。</p>
          <p>購入前に商品説明・本規約を十分にご確認のうえお申し込みください。</p>
        </Section>

        <Section title="第5条（禁止事項）">
          <p>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
          <ol style={olStyle}>
            <li>法令または公序良俗に違反する行為</li>
            <li>本サービスのコンテンツを無断で複製、転載、販売、再配布する行為</li>
            <li>アクセス権を第三者と共有する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>本サービスのリバースエンジニアリング、改ざん、不正アクセスを試みる行為</li>
            <li>運営者または第三者の知的財産権、プライバシー、名誉、その他の権利を侵害する行為</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ol>
        </Section>

        <Section title="第6条（アクセス権の取消）">
          <p>利用者が前条の禁止事項に違反した場合、運営者は事前通知なくアクセス権を取り消すことができ、利用料金の返金は行いません。</p>
        </Section>

        <Section title="第7条（知的財産権）">
          <p>本サービスに含まれるコンテンツ（テキスト、画像、シナリオ等）の著作権その他の知的財産権は、運営者または正当な権利者に帰属します。利用者は、私的利用の範囲を超えて利用することはできません。</p>
        </Section>

        <Section title="第8条（免責事項）">
          <ol style={olStyle}>
            <li>本サービスは、消防業務における学習・訓練の参考情報として提供されるものであり、実際の消防活動・救急活動を保証するものではありません。</li>
            <li>本サービスのコンテンツを利用したことに起因する損害について、運営者は一切の責任を負いません。</li>
            <li>運営者は、本サービスの提供を予告なく中断、変更、終了することがあります。</li>
            <li>本サービスのシステム障害、メンテナンス、不可抗力により利用できない場合、運営者は責任を負いません。</li>
          </ol>
        </Section>

        <Section title="第9条（個人情報の取扱い）">
          <p>運営者は、利用者の個人情報を別途定める「プライバシーポリシー」に従い適切に取り扱います。</p>
          <p><a href="/privacy" style={linkStyle}>プライバシーポリシーはこちら</a></p>
        </Section>

        <Section title="第10条（規約の変更）">
          <p>運営者は、必要と判断した場合、利用者への事前通知なく本規約を変更することがあります。変更後の規約は、本サービス上に掲載した時点で効力を生じるものとします。</p>
        </Section>

        <Section title="第11条（準拠法・管轄裁判所）">
          <ol style={olStyle}>
            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
            <li>本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。</li>
          </ol>
        </Section>

        <Section title="第12条（お問い合わせ）">
          <p>本規約に関するお問い合わせは、以下のメールアドレスまでご連絡ください。</p>
          <p style={{ background: "#1e293b", padding: 12, borderRadius: 6 }}>
            <a href="mailto:kusunoki.yoshiaki11120614@gmail.com" style={{ color: "#f97316", textDecoration: "underline", fontFamily: "monospace" }}>kusunoki.yoshiaki11120614@gmail.com</a>
          </p>
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

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `使用條款 | ${siteConfig.name}`,
  description: "說明本站解析內容的使用界線、免責範圍與平台規範。",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="shell legal-panel">
        <span className="eyebrow">Terms</span>
        <h1>使用條款與免責聲明</h1>
        <p>
          本站提供的星座、紫微斗數、塔羅與 AI
          解析內容，屬於娛樂、陪伴與自我整理用途，不構成醫療、法律、投資、心理治療或其他專業意見。
        </p>
        <h2>內容使用界線</h2>
        <p>
          解析內容不應被視為保證、承諾或絕對預測。使用者應自行評估資訊適用性，並對重要決策保留獨立判斷。
        </p>
        <h2>金融主題特別提醒</h2>
        <p>
          金融相關內容僅提供風險整理、情境分析與保守提醒，不構成投資建議，也不保證任何資產表現或報酬。
        </p>
        <h2>可接受使用</h2>
        <p>
          使用者不得利用本站進行違法活動、散布騷擾或仇恨內容、嘗試繞過服務限制，或以自動化方式濫用系統資源。
        </p>
        <h2>服務調整</h2>
        <p>
          本站得視產品狀態、模型供應或法規需求，隨時更新內容、調整功能、中止部分服務，或修改本條款。
        </p>
      </div>
    </main>
  );
}


import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `隱私權政策 | ${siteConfig.name}`,
  description: "說明本站如何蒐集、使用與保護使用者輸入資料與分析紀錄。",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="shell legal-panel">
        <span className="eyebrow">Privacy</span>
        <h1>隱私權政策</h1>
        <p>
          本站重視你的隱私。當你使用戀愛、工作、金融等解析服務時，你輸入的文字、出生資訊或提問內容，僅用於產生當次 AI
          分析結果、改善服務流程與維持系統運作。
        </p>
        <h2>蒐集的資訊</h2>
        <p>
          我們可能蒐集你主動輸入的表單資料、基本裝置資訊、錯誤紀錄，以及與網站互動時產生的匿名使用資料。
        </p>
        <h2>使用方式</h2>
        <p>
          蒐集資料主要用於提供解析結果、提升回應品質、排查技術問題與維護服務安全。我們不會將你的個人內容出售給第三方。
        </p>
        <h2>第三方服務</h2>
        <p>
          本站可能使用 Gemini API、Vercel 與網站分析工具等第三方服務。你的請求資料可能在這些服務中被處理，並受其隱私政策約束。
        </p>
        <h2>資料保存</h2>
        <p>
          若未來加入會員或紀錄功能，我們會再補充保存期間、刪除方式與帳號管理規則。現階段建議不要輸入過度敏感的個資。
        </p>
        <h2>聯絡方式</h2>
        <p>
          若你對隱私權政策有疑問，建議在正式上線前補上聯絡信箱或客服窗口，供使用者提出查詢與刪除請求。
        </p>
      </div>
    </main>
  );
}


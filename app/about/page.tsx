export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="shell about-grid">
        <section className="about-panel">
          <span className="eyebrow">About</span>
          <h2>這個網站會如何提供解析</h2>
          <p>
            使用者先選擇主題與解析方法，再輸入生日、問題背景、抽牌結果或其他必要資訊。系統會把命理規則與 AI
            語言能力結合，輸出一份更易讀、較具陪伴感的建議。
          </p>
          <p>
            目前完成的是網站骨架與體驗方向，後續會補上表單、AI 串接、結果頁、紀錄功能與正式上線設定。
          </p>
        </section>

        <section className="about-panel">
          <span className="eyebrow">Disclaimer</span>
          <h2>免責與使用界線</h2>
          <p>
            本站內容屬於娛樂、陪伴與個人反思用途，不構成醫療、法律、投資或其他專業意見。若牽涉心理壓力、財務決策或重要人生規劃，仍應結合專業資源判斷。
          </p>
          <p>
            在金融主題上，系統會避免提供明確投資指示，而改以風險提示與情境分析為主。
          </p>
        </section>
      </div>
    </main>
  );
}

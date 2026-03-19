import Link from "next/link";
import { methods, principles, themes } from "@/data/site";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Destiny Reading Studio</span>
            <h1>
              把命運的線索
              <br />
              轉譯成你今晚看得懂的答案
            </h1>
            <p>
              這是一個結合星座、紫微斗數、塔羅與 Gemini AI
              的運勢解析網站。你可以從戀愛、工作、金融切入，讓神秘學的訊號被整理成更貼近生活的建議。
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="#themes">
                開始探索主題
              </Link>
              <Link className="button-secondary" href="/about">
                了解服務方式
              </Link>
            </div>
          </div>

          <div className="hero-card" aria-hidden="true">
            <div className="orb one" />
            <div className="orb two" />
            <div className="constellation">
              <span style={{ top: "18%", left: "26%" }} />
              <span style={{ top: "38%", left: "55%" }} />
              <span style={{ top: "30%", left: "72%" }} />
              <span style={{ top: "58%", left: "24%" }} />
              <span style={{ top: "66%", left: "66%" }} />
              <svg viewBox="0 0 100 100" fill="none">
                <path
                  d="M25 20L55 38L72 30L65 66L24 58L55 38"
                  stroke="rgba(255,247,222,0.65)"
                  strokeWidth="0.9"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="themes">
        <div className="shell">
          <div className="section-title">
            <span className="eyebrow">Themes</span>
            <h2>從你最在意的領域開始</h2>
            <p>
              先選擇你現在最想理解的主題，再進入對應的解析流程。每個領域都會有不同的引導語氣、提問方式與建議重點。
            </p>
          </div>

          <div className="theme-grid">
            {themes.map((theme) => (
              <Link
                key={theme.slug}
                className="theme-card"
                href={`/reading/${theme.slug}`}
                style={
                  {
                    ["--card-accent" as string]: theme.accent,
                  } as React.CSSProperties
                }
              >
                <span className="eyebrow">{theme.label}</span>
                <h3>{theme.title}</h3>
                <p>{theme.intro}</p>
                <span className="theme-link">進入解析入口 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-title">
            <span className="eyebrow">Methods</span>
            <h2>三種解析方法，三種進入命運的角度</h2>
            <p>
              星座適合看近期節奏，紫微斗數適合長線格局，塔羅則更適合聚焦當下問題。AI
              會把它們整理成容易理解的回應。
            </p>
          </div>

          <div className="method-grid">
            {methods.map((method, index) => (
              <article className="method-card" key={method.name}>
                <div className="method-index">Method 0{index + 1}</div>
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-title">
            <span className="eyebrow">Principles</span>
            <h2>AI 不是替你決定，而是幫你看得更清楚</h2>
            <p>
              這個服務會保留神秘感，但不會把命運包裝成絕對答案。尤其在金融與重大決策上，系統會主動提醒風險。
            </p>
          </div>

          <div className="principle-grid">
            {principles.map((item) => (
              <article className="glass-card" key={item}>
                <h3>使用原則</h3>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


import type { CSSProperties } from "react";
import Link from "next/link";
import { methods, principles, themes } from "@/data/site";
import { methodModules } from "@/data/modules";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Cute Destiny Playground</span>
            <h1>
              用 Q 版命運小夥伴
              <br />
              陪你拆開今天的運勢驚喜包
            </h1>
            <p>
              這是一個結合星座、紫微斗數、塔羅與 Gemini AI
              的可愛系運勢解析網站。你可以從戀愛、工作、金融切入，讓神秘學的訊號被整理成更貼近生活、又更像被小精靈陪伴的建議。
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
            <div className="sticker-cloud pink" />
            <div className="sticker-cloud mint" />
            <div className="mascot-stage">
              <div className="mascot mascot-rabbit">
                <span className="face eye left" />
                <span className="face eye right" />
                <span className="face blush left" />
                <span className="face blush right" />
              </div>
              <div className="mascot mascot-bear">
                <span className="face eye left" />
                <span className="face eye right" />
                <span className="face blush left" />
                <span className="face blush right" />
              </div>
              <div className="mascot mascot-cat">
                <span className="face eye left" />
                <span className="face eye right" />
                <span className="face blush left" />
                <span className="face blush right" />
              </div>
              <div className="sparkle sparkle-a">★</div>
              <div className="sparkle sparkle-b">✦</div>
              <div className="sparkle sparkle-c">✿</div>
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
                  } as CSSProperties
                }
              >
                <span className="eyebrow">{theme.label}</span>
                <h3>{theme.title}</h3>
                <div className="theme-mascot">{theme.mascot}</div>
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
                <p>{method.vibe}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-title">
            <span className="eyebrow">Modules</span>
            <h2>三個命運模組，三位 Q 版夥伴</h2>
            <p>
              我們把每種解析方式都整理成可擴充的模組，之後不管要接更多欄位、命盤規則或牌陣，都可以沿著同一套結構成長。
            </p>
          </div>

          <div className="method-grid">
            {Object.values(methodModules).map((module) => (
              <article className="method-card" key={module.name}>
                <div className="method-index">{module.mascot}</div>
                <h3>{module.name}模組</h3>
                <p>{module.summary}</p>
                <p>必要欄位：{module.requiredFields.join("、")}</p>
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

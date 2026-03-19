import Link from "next/link";
import { notFound } from "next/navigation";
import { methods, principles, themes } from "@/data/site";
import { ReadingForm } from "./reading-form";

type PageProps = {
  params:
    | {
        topic: string;
      }
    | Promise<{
    topic: string;
      }>;
};

export function generateStaticParams() {
  return themes.map((theme) => ({
    topic: theme.slug,
  }));
}

export const dynamicParams = false;

export default async function ReadingTopicPage({ params }: PageProps) {
  const { topic } = await Promise.resolve(params);
  const theme = themes.find((item) => item.slug === topic);

  if (!theme) {
    notFound();
  }

  return (
    <main className={`reading-page reading-page-${theme.slug}`}>
      <div className="shell">
        <section className="reading-hero">
          <span className="eyebrow">{theme.label}</span>
          <h1>{theme.title}</h1>
          <p>{theme.intro}</p>
          <div className="hero-actions">
            <Link className="button-primary" href="/">
              返回首頁
            </Link>
            <Link className="button-secondary" href="/about">
              查看服務說明
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <span className="eyebrow">Flow</span>
            <h2>預計解析流程</h2>
            <p>
              這一頁先建立資訊架構，下一步會接上實際表單與 Gemini
              回應流程，讓使用者能真正輸入資料並取得結果。
            </p>
          </div>

          <div className="flow-grid">
            <article className="flow-step">
              <strong>步驟一</strong>
              選擇解析方法：星座、紫微斗數或塔羅。
            </article>
            <article className="flow-step">
              <strong>步驟二</strong>
              輸入個人資料、問題背景或抽牌資訊。
            </article>
            <article className="flow-step">
              <strong>步驟三</strong>
              由 Gemini 整理分析結果與可行建議。
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <span className="eyebrow">Methods</span>
            <h2>{theme.label}主題可搭配的解析方式</h2>
            <p>
              每一種方法都會產出不同角度的解讀，後續會依主題配置不同表單欄位與提示詞。
            </p>
          </div>

          <div className="method-grid">
            {methods.map((method, index) => (
              <article className="method-card" key={method.name}>
                <div className="method-index">方法 0{index + 1}</div>
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </article>
            ))}
          </div>
        </section>

        <ReadingForm
          prompts={theme.prompts}
          resultPreview={theme.resultPreview}
          topic={theme.slug}
          topicLabel={theme.label}
        />

        <section className="section">
          <div className="section-title">
            <span className="eyebrow">Notice</span>
            <h2>回應界線與提醒</h2>
            <p>
              這些原則會在正式串接 AI
              後持續保留，確保內容有陪伴感，也有必要的安全邊界。
            </p>
          </div>

          <div className="glass-card">
            <ul className="notice">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

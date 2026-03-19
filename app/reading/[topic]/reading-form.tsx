"use client";

import { useState, useTransition } from "react";
import { methods } from "@/data/site";
import { getMethodModule } from "@/lib/modules";
import { getMethodResultLabel } from "@/lib/reading";
import { getTopicModule } from "@/lib/topics";
import type {
  MethodName,
  ReadingApiResponse,
  ReadingFormValues,
  ReadingResult,
  TopicSlug,
} from "@/types/reading";

type ReadingFormProps = {
  topic: TopicSlug;
  topicLabel: string;
  prompts: readonly string[];
  resultPreview: readonly string[];
};

export function ReadingForm({
  topic,
  topicLabel,
  prompts,
  resultPreview,
}: ReadingFormProps) {
  const topicModule = getTopicModule(topic);
  const [form, setForm] = useState<ReadingFormValues>({
    topic,
    method: "星座",
    birthInfo: "",
    concern: topicModule.concernOptions[0],
    desiredOutcome: "",
    question: "",
    extraContext: "",
  });
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const module = getMethodModule(form.method);
  const methodResultLabel = getMethodResultLabel(form.method);
  const displayResultLabels: Array<{
    key: keyof ReadingResult;
    title: string;
  }> = [
    { key: "summary", title: "整體情勢" },
    { key: "methodFocus", title: methodResultLabel },
    { key: "insight", title: "核心觀察" },
    { key: "action", title: "溫和行動" },
    { key: "caution", title: "留意提醒" },
    { key: "closing", title: "收尾訊息" },
  ];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setErrorCode(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/reading", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = (await response.json()) as ReadingApiResponse & { error?: string };

        if (!response.ok) {
          setResult(null);
          setModel(null);
          setError(data.error || "解析失敗，請稍後再試。");
          setErrorCode(data.code || null);
          return;
        }

        setResult(data.result);
        setModel(data.model);
        setErrorCode(null);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error ? fetchError.message : "無法連線到伺服器";
        setResult(null);
        setModel(null);
        setError(message);
        setErrorCode("NETWORK_ERROR");
      }
    });
  };

  const resetForm = () => {
    setForm({
      topic,
      method: "星座",
      birthInfo: "",
      concern: topicModule.concernOptions[0],
      desiredOutcome: "",
      question: "",
      extraContext: "",
    });
    setResult(null);
    setError(null);
    setErrorCode(null);
    setModel(null);
  };

  return (
    <>
      <section className="section">
        <div className="section-title">
          <span className="eyebrow">輸入流程</span>
          <h2>分析輸入流程</h2>
          <p>
            這裡已接上實際送出流程。填入問題後，系統會將主題、方法與描述整理成提示詞，再送往 Gemini
            產生回應。
          </p>
        </div>

        <div className="input-layout">
          <div className="input-panel">
            <form className="mock-form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="method">選擇解析方法</label>
                <select
                  id="method"
                  value={form.method}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      method: event.target.value as MethodName,
                    }))
                  }
                >
                  {methods.map((method) => (
                    <option key={method.name} value={method.name}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="concern">{topicModule.concernLabel}</label>
                <select
                  id="concern"
                  value={form.concern}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      concern: event.target.value,
                    }))
                  }
                >
                  {topicModule.concernOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="birth">出生資訊 / 參考時間</label>
                <input
                  id="birth"
                  placeholder="例如：1998-08-08 21:30，或填入你要解析的時間點"
                  type="text"
                  value={form.birthInfo}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      birthInfo: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="desiredOutcome">{topicModule.goalLabel}</label>
                <input
                  id="desiredOutcome"
                  placeholder={topicModule.goalPlaceholder}
                  type="text"
                  value={form.desiredOutcome}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      desiredOutcome: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="extraContext">補充資訊</label>
                <textarea
                  id="extraContext"
                  placeholder={topicModule.extraPlaceholder}
                  value={form.extraContext}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      extraContext: event.target.value,
                    }))
                  }
                />
                <small>不同方法可搭配不同補充資料，讓解析更貼近你的情境。</small>
              </div>

              <div className="field">
                <label htmlFor="question">你目前最想提問的事情</label>
                <textarea
                  id="question"
                  placeholder={`描述你的${topicLabel}狀況、目前困擾與想知道的方向`}
                  value={form.question}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      question: event.target.value,
                    }))
                  }
                />
                <small>
                  後續可依方法再加上抽牌結果、對象背景、流年資訊等欄位。
                </small>
              </div>

              <button className="button-primary submit-button" disabled={isPending} type="submit">
                {isPending ? "解析中..." : `開始${topicLabel}解析`}
              </button>
              <button className="button-secondary submit-button" type="button" onClick={resetForm}>
                清空重填
              </button>
            </form>
          </div>

          <div className="result-panel">
            <div className="field">
              <label>主題分析模組</label>
              <div className="module-card">
                <strong>{topicModule.mascot}</strong>
                <p>{topicModule.summary}</p>
                <p>聚焦重點：{topicModule.focusAreas.join("、")}</p>
                <p>結果語氣：{topicModule.resultTone}</p>
              </div>
            </div>

            <div className="field">
              <label>目前方法模組</label>
              <div className="module-card">
                <strong>
                  {module.mascot}陪你看 {form.method}
                </strong>
                <p>{module.summary}</p>
                <p>必要欄位：{module.requiredFields.join("、")}</p>
                <p>可補充欄位：{module.optionalFields.join("、")}</p>
              </div>
            </div>

            <div className="field">
              <label>建議追問方向</label>
              <div className="chip-row">
                {prompts.map((prompt) => (
                  <button
                    className="chip chip-button"
                    key={prompt}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        question: current.question
                          ? `${current.question}\n${prompt}`
                          : prompt,
                      }))
                    }
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>結果將拆分成這些區塊</label>
              <div className="chip-row">
                {resultPreview.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="helper-text">
              {topicLabel}主題會優先聚焦 {topicModule.focusAreas.join("、")}，讓結果更貼近實際狀況。
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <span className="eyebrow">解析結果</span>
          <h2>AI 解析結果</h2>
          <p>
            回應會拆成多個閱讀區塊，讓使用者比較容易理解情勢、提醒與下一步。
          </p>
        </div>

        {error ? (
          <div className="error-banner">
            <strong>目前無法完成解析</strong>
            <p>{error}</p>
            {errorCode ? <p className="error-code">錯誤代碼：{errorCode}</p> : null}
            <div className="hero-actions compact-actions">
              <button
                className="button-primary"
                onClick={() => {
                  setError(null);
                  setErrorCode(null);
                }}
                type="button"
              >
                關閉提醒
              </button>
            </div>
          </div>
        ) : null}

        {isPending ? (
          <div className="pending-card">
            <strong>小夥伴正在整理命運線索</strong>
            <p>系統正在組合主題、方法與安全規則，請再等一下下。</p>
          </div>
        ) : null}

        <div className="result-grid">
          {(result
            ? displayResultLabels.map((item) => ({
                title: item.title,
                value: result[item.key],
              }))
            : [
                ...resultPreview,
                methodResultLabel,
              ].map((item) => ({
                title: item,
                value: "提交表單後，這裡會顯示 Gemini 整理後的解析內容。",
              }))).map((item, index) => (
            <article className="result-card" key={`${item.title}-${index}`}>
              <strong>結果 0{index + 1}</strong>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </article>
          ))}
        </div>

        {model ? <p className="model-note">本次解析模型：{model}</p> : null}
        <p className="model-note">結果僅供方向整理與自我反思，不取代專業意見。</p>
      </section>
    </>
  );
}

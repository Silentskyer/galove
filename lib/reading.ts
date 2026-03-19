import type { MethodName, ReadingFormValues, TopicSlug } from "@/types/reading";
import { buildMethodPromptBlock } from "@/lib/modules";

const topicLabels: Record<TopicSlug, string> = {
  love: "戀愛",
  work: "工作",
  finance: "金融",
};

const topicFocus: Record<TopicSlug, string> = {
  love: "感情狀態、互動節奏、情緒需求與下一步關係建議",
  work: "職場狀態、合作互動、機會判斷與下一步工作建議",
  finance: "金流節奏、風險意識、消費或投資情緒與保守建議",
};

const methodGuides: Record<MethodName, string> = {
  星座: "用星座與近期能量節奏的角度解讀，語氣柔和而具象。",
  紫微斗數: "用命盤格局、流年趨勢與人生階段的角度解讀，語氣沉穩清晰。",
  塔羅: "用抽牌式提問與象徵解讀的角度回應，聚焦當下議題與行動指引。",
};

export function buildGeminiPrompt(values: ReadingFormValues) {
  return `
你是一位細膩、溫柔、克制的命運顧問，要為使用者提供 ${topicLabels[values.topic]} 主題的解析。

主題重點：
${topicFocus[values.topic]}

解析方法：
${values.method}
${methodGuides[values.method]}
${buildMethodPromptBlock(values.method, values.topic)}

使用者資料：
- 主題：${topicLabels[values.topic]}
- 方法：${values.method}
- 出生資訊或參考時間：${values.birthInfo || "未提供"}
- 問題描述：${values.question}
- 額外補充：${values.extraContext?.trim() || "未提供"}

回應規則：
- 使用繁體中文。
- 保持神秘感與陪伴感，但不要做絕對預言。
- 整體風格要像可愛的命運小夥伴在陪伴使用者，但內容仍要實用。
- 金融主題禁止提供明確投資指示，請改為風險提醒與保守建議。
- 不要提到你是 AI 或模型。
- 內容要具體、溫柔、容易閱讀。

請只輸出 JSON，格式如下：
{
  "summary": "整體情勢解讀，2 到 3 句",
  "insight": "對當前狀態的核心觀察，2 到 3 句",
  "action": "接下來可採取的溫和行動建議，2 到 3 句",
  "caution": "需要留意的風險、誤區或提醒，1 到 2 句",
  "closing": "一句有陪伴感的收尾"
}
`.trim();
}

export function validateReadingInput(values: Partial<ReadingFormValues>) {
  const validTopics = new Set<TopicSlug>(["love", "work", "finance"]);
  const validMethods = new Set<MethodName>(["星座", "紫微斗數", "塔羅"]);

  if (!values.topic || !validTopics.has(values.topic)) {
    return "無效的主題類型。";
  }

  if (!values.method || !validMethods.has(values.method)) {
    return "無效的解析方法。";
  }

  if (!values.question || values.question.trim().length < 8) {
    return "請至少輸入 8 個字描述你的問題。";
  }

  if ((values.birthInfo || "").trim().length > 120) {
    return "出生資訊或參考時間過長，請精簡後再試。";
  }

  if (values.question.trim().length > 1200) {
    return "問題描述過長，請控制在 1200 字內。";
  }

  if ((values.extraContext || "").trim().length > 600) {
    return "補充資訊過長，請控制在 600 字內。";
  }

  return null;
}

export function extractJsonObject(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

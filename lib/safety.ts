import type { ReadingFormValues } from "@/types/reading";

const blockedPatterns = [
  /自殺|輕生|不想活/i,
  /保證獲利|內線|明牌/i,
  /詐騙|騙錢|洗錢/i,
] as const;

export const safetyRules = [
  "不得做出絕對預言、恐嚇式暗示或宣稱命定不可改變。",
  "若使用者表現出高度心理危機，不要繼續占卜式延伸，改以關心、安全與尋求真人協助為優先。",
  "金融內容不得提供買進、賣出、槓桿、保證獲利等具體投資指令。",
  "不得鼓勵使用者依賴單次解析做重大醫療、法律、財務或人生決策。",
  "回應應避免羞辱、操控、極端二分法與對第三人的危險煽動。",
  "若資訊不足，應坦白指出只能提供方向性整理與保守建議。",
] as const;

export function buildSafetyPromptBlock() {
  return ["安全規則：", ...safetyRules.map((rule) => `- ${rule}`)].join("\n");
}

export function detectSafetyRisk(values: Partial<ReadingFormValues>) {
  const joined = [
    values.concern,
    values.desiredOutcome,
    values.question,
    values.extraContext,
  ]
    .filter(Boolean)
    .join("\n");

  const matched = blockedPatterns.find((pattern) => pattern.test(joined));

  if (!matched) {
    return null;
  }

  return "這個問題涉及高風險或敏感情境，目前無法直接提供命運解析。若有立即安全疑慮，請優先尋求可信任的真人協助與在地緊急支援。";
}


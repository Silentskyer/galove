import { methodModules } from "@/data/modules";
import { themes } from "@/data/site";
import type { MethodName, TopicSlug } from "@/types/reading";

export function getMethodModule(method: MethodName) {
  return methodModules[method];
}

export function getTopicMeta(topic: TopicSlug) {
  const theme = themes.find((item) => item.slug === topic);

  if (!theme) {
    throw new Error(`Unknown topic: ${topic}`);
  }

  return theme;
}

export function buildMethodPromptBlock(method: MethodName, topic: TopicSlug) {
  const module = getMethodModule(method);

  return [
    `方法摘要：${module.summary}`,
    `吉祥物語氣：${module.mascot}，語氣可愛、溫柔、帶安撫感。`,
    `必要欄位：${module.requiredFields.join("、")}`,
    `可補充欄位：${module.optionalFields.join("、")}`,
    `解讀角度：${module.interpretationLens.join(" / ")}`,
    `主題微調：${module.topicAdjustments[topic]}`,
  ].join("\n");
}


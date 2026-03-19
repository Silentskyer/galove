import { topicModules } from "@/data/topics";
import type { TopicSlug } from "@/types/reading";

export function getTopicModule(topic: TopicSlug) {
  return topicModules[topic];
}

export function buildTopicPromptBlock(topic: TopicSlug, concern?: string, desiredOutcome?: string) {
  const module = getTopicModule(topic);

  return [
    `主題摘要：${module.summary}`,
    `主題吉祥物：${module.mascot}`,
    `分析聚焦：${module.focusAreas.join(" / ")}`,
    `結果語氣：${module.resultTone}`,
    `當前卡點：${concern?.trim() || "未提供"}`,
    `期待方向：${desiredOutcome?.trim() || "未提供"}`,
  ].join("\n");
}


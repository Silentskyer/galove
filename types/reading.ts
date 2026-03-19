export type TopicSlug = "love" | "work" | "finance";

export type MethodName = "星座" | "紫微斗數" | "塔羅";

export type ReadingFormValues = {
  topic: TopicSlug;
  method: MethodName;
  birthInfo: string;
  concern?: string;
  desiredOutcome?: string;
  question: string;
  extraContext?: string;
};

export type ReadingResult = {
  summary: string;
  insight: string;
  action: string;
  caution: string;
  closing: string;
};

export type ReadingApiResponse = {
  result: ReadingResult;
  model: string;
};

import type { TopicSlug } from "@/types/reading";

export type TopicModule = {
  slug: TopicSlug;
  mascot: string;
  summary: string;
  concernLabel: string;
  concernOptions: string[];
  goalLabel: string;
  goalPlaceholder: string;
  extraPlaceholder: string;
  focusAreas: string[];
  resultTone: string;
};

export const topicModules: Record<TopicSlug, TopicModule> = {
  love: {
    slug: "love",
    mascot: "戀愛棉花糖兔",
    summary: "偏重關係氛圍、雙方互動節奏、情緒需求與推進方式。",
    concernLabel: "目前的感情卡點",
    concernOptions: ["曖昧不明", "溝通變少", "復合猶豫", "情緒不安", "不知道要不要主動"],
    goalLabel: "你最想得到的戀愛方向",
    goalPlaceholder: "例如：想知道要不要主動聯繫、怎麼讓關係更穩定",
    extraPlaceholder: "可補充對方背景、最近互動、你在意的情緒訊號或關係狀態",
    focusAreas: ["互動溫度", "情緒安全感", "主動與等待的節奏"],
    resultTone: "溫柔、曖昧感、帶安撫但不過度夢幻",
  },
  work: {
    slug: "work",
    mascot: "努力星星熊",
    summary: "偏重職場節奏、合作關係、壓力來源與下一步實際選擇。",
    concernLabel: "目前的工作卡點",
    concernOptions: ["職場壓力", "轉職猶豫", "升遷表現", "人際協作", "方向不清楚"],
    goalLabel: "你最想得到的工作方向",
    goalPlaceholder: "例如：想知道要不要換工作、該先穩住還是主動爭取機會",
    extraPlaceholder: "可補充職位、產業、主管互動、專案狀態或你最近的壓力來源",
    focusAreas: ["職場阻力", "合作互動", "近期行動優先順序"],
    resultTone: "沉穩、清楚、實用，幫助使用者收斂焦慮",
  },
  finance: {
    slug: "finance",
    mascot: "招財雲朵貓",
    summary: "偏重金流節奏、風險意識、情緒性判斷與保守建議。",
    concernLabel: "目前的金融卡點",
    concernOptions: ["收入不穩", "支出壓力", "投資猶豫", "大額花費", "理財焦慮"],
    goalLabel: "你最想得到的金融方向",
    goalPlaceholder: "例如：想知道近期該保守觀望、先整理支出，或怎麼降低焦慮",
    extraPlaceholder: "可補充近期金流狀況、支出壓力、投資情緒或你最擔心的風險點",
    focusAreas: ["金流節奏", "情緒化決策", "保守風險提醒"],
    resultTone: "溫和但克制，強調風險界線與保守思考",
  },
};


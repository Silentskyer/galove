import type { MethodName, TopicSlug } from "@/types/reading";

export type MethodModule = {
  name: MethodName;
  mascot: string;
  summary: string;
  requiredFields: string[];
  optionalFields: string[];
  interpretationLens: string[];
  topicAdjustments: Record<TopicSlug, string>;
};

export const methodModules: Record<MethodName, MethodModule> = {
  星座: {
    name: "星座",
    mascot: "小星靈",
    summary: "用星座性格、近期行星感受與互動氛圍，整理短期能量節奏。",
    requiredFields: ["問題描述"],
    optionalFields: ["生日", "出生時間", "對象星座", "近期事件"],
    interpretationLens: [
      "情緒流動與互動節奏",
      "當下最強烈的能量主題",
      "近期適合主動或等待的時機",
    ],
    topicAdjustments: {
      love: "聚焦曖昧氛圍、關係推進與情感需求。",
      work: "聚焦職場氣氛、合作默契與近期表現節奏。",
      finance: "聚焦消費情緒、金流節奏與風險敏感度。",
    },
  },
  紫微斗數: {
    name: "紫微斗數",
    mascot: "小命盤獸",
    summary: "用命盤格局、宮位關聯與流年感，做比較長線的人生脈絡整理。",
    requiredFields: ["生日", "出生時間", "問題描述"],
    optionalFields: ["出生地", "近期重大轉折", "在意的關係人"],
    interpretationLens: [
      "本命特質與處事模式",
      "現階段課題與壓力來源",
      "更適合穩定推進的選擇方向",
    ],
    topicAdjustments: {
      love: "聚焦感情模式、關係角色與長期相處感。",
      work: "聚焦事業宮位象徵、職涯位置與中長線節奏。",
      finance: "聚焦財帛觀念、資源流向與穩健配置思維。",
    },
  },
  塔羅: {
    name: "塔羅",
    mascot: "小牌靈",
    summary: "用抽牌象徵、當下心境與情境提問，回應眼前最具體的困惑。",
    requiredFields: ["問題描述"],
    optionalFields: ["抽牌結果", "牌陣名稱", "問題對象", "近期情緒"],
    interpretationLens: [
      "當前卡點與隱藏情緒",
      "外部情勢與內在需求的落差",
      "最溫和但有效的一步",
    ],
    topicAdjustments: {
      love: "聚焦雙方心意、訊號落差與接近方式。",
      work: "聚焦壓力來源、決策猶豫與行動優先順序。",
      finance: "聚焦情緒化選擇、衝動判斷與保守節奏。",
    },
  },
};


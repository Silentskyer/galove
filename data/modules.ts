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
    summary: "用星座性格、行星位置與星辰之間的連動感，整理短期能量節奏。",
    requiredFields: ["問題描述"],
    optionalFields: ["生日", "出生時間", "對象星座", "近期事件"],
    interpretationLens: [
      "情緒流動與互動節奏",
      "星辰之間的相位關聯與能量流向",
      "近期適合主動或等待的時機",
    ],
    topicAdjustments: {
      love: "聚焦曖昧氛圍、關係推進、情感需求與雙方星象互動。",
      work: "聚焦職場氣氛、合作默契、近期表現節奏與行星能量變化。",
      finance: "聚焦消費情緒、金流節奏、風險敏感度與星象波動。",
    },
  },
  紫微斗數: {
    name: "紫微斗數",
    mascot: "小命盤獸",
    summary: "用命盤格局、宮位關聯、流年與命格特質，做比較長線的人生脈絡整理。",
    requiredFields: ["生日", "出生時間", "問題描述"],
    optionalFields: ["出生地", "近期重大轉折", "在意的關係人"],
    interpretationLens: [
      "本命特質、主星個性與處事模式",
      "現階段課題、宮位重心與命格壓力來源",
      "更適合穩定推進的選擇方向",
    ],
    topicAdjustments: {
      love: "聚焦感情模式、命格中的關係角色與長期相處感。",
      work: "聚焦事業宮位象徵、職涯位置、命格節奏與中長線發展。",
      finance: "聚焦財帛宮意象、資源流向與穩健配置思維。",
    },
  },
  塔羅: {
    name: "塔羅",
    mascot: "小牌靈",
    summary: "用抽牌象徵、牌組訊號、牌陣位置與當下心境，回應眼前最具體的困惑。",
    requiredFields: ["問題描述"],
    optionalFields: ["抽牌結果", "牌陣名稱", "問題對象", "近期情緒"],
    interpretationLens: [
      "當前卡點與隱藏情緒",
      "牌組象徵、牌陣位置與外部情勢的呼應",
      "最溫和但有效的一步",
    ],
    topicAdjustments: {
      love: "聚焦雙方心意、牌組中的訊號落差與接近方式。",
      work: "聚焦壓力來源、決策猶豫與牌陣中的行動優先順序。",
      finance: "聚焦情緒化選擇、衝動判斷與牌組提醒的保守節奏。",
    },
  },
};

export const siteConfig = {
  name: "Gal and Love",
  title: "Gal and Love | 運勢與命運解析",
  description:
    "以星座、紫微斗數、塔羅結合 AI 建議，提供戀愛、工作、金融等主題的命運解析。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://galove.vercel.app",
  keywords: [
    "運勢解析",
    "命運解析",
    "戀愛運勢",
    "工作運勢",
    "金融運勢",
    "塔羅",
    "星座",
    "紫微斗數",
    "Gemini",
    "AI 占卜",
  ],
} as const;


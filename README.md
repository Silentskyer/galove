# Gal and Love

一個以戀愛、工作、金融運勢為主題的命運解析網站，整合星座、紫微斗數、塔羅與 AI 建議流程，預計部署到 Vercel。

## Tech Stack

- Next.js App Router
- TypeScript
- Gemini API
- Vercel

## Local Development

1. 安裝 Node.js 20+
2. 複製 `.env.example` 為 `.env.local`
3. 填入 `GEMINI_API_KEY`
4. 安裝依賴：`npm install`
5. 啟動開發環境：`npm run dev`

## Current Status

- 已完成專案骨架
- 已完成首頁與主題入口初版
- 已完成分析流程與 Gemini API route

## Gemini Integration

- API route: `/api/reading`
- Environment variable: `GEMINI_API_KEY`
- Current model: `gemini-2.5-flash`

Gemini API 的 REST `generateContent` 端點與 `x-goog-api-key` header 寫法，依官方 Gemini API 文件與 Quickstart 實作。

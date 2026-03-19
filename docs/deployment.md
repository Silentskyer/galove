# 部署說明

## GitHub

- Repository: `https://github.com/Silentskyer/galove`
- Default branch: `main`

## Vercel

1. 在 Vercel 建立新專案並匯入 `Silentskyer/galove`
2. Framework Preset 選擇 `Next.js`
3. Build Command 使用預設值
4. Output Directory 保持空白
5. 在 Environment Variables 加入：
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

## 建議環境變數

- Production: `NEXT_PUBLIC_SITE_URL=https://你的正式網域`
- Preview: `NEXT_PUBLIC_SITE_URL=https://你的-vercel-preview-url`
- Development: `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

## 上線前檢查

- 確認首頁、分類頁、隱私權政策、使用條款都可正常開啟
- 確認 `/sitemap.xml` 與 `/robots.txt` 有輸出
- 確認 Gemini API key 已設定於 Vercel
- 確認金融頁有保守提醒與免責內容


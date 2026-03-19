import { NextResponse } from "next/server";
import {
  buildGeminiPrompt,
  extractJsonObject,
  validateReadingInput,
} from "@/lib/reading";
import type { ReadingApiResponse, ReadingFormValues, ReadingResult } from "@/types/reading";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function safeResult(partial: Partial<ReadingResult>): ReadingResult {
  return {
    summary: partial.summary?.trim() || "目前的能量正在提醒你先把重心收回自己，先看清楚真正的需求。",
    insight: partial.insight?.trim() || "你在意的不只是結果，而是過程裡是否感到穩定與被理解。",
    action: partial.action?.trim() || "先做一個最小但明確的行動，讓狀態從反覆猜測回到可觀察的節奏。",
    caution: partial.caution?.trim() || "避免在情緒最濃的時候做出過度放大風險的判斷。",
    closing: partial.closing?.trim() || "有些答案不是立刻出現，而是在你慢慢站穩之後變得清楚。",
  };
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ReadingFormValues>;
  const error = validateReadingInput(payload);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "尚未設定 GEMINI_API_KEY，請先在環境變數中加入 Gemini 金鑰。" },
      { status: 503 },
    );
  }

  const prompt = buildGeminiPrompt(payload as ReadingFormValues);

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          responseMimeType: "application/json",
        },
      }),
      cache: "no-store",
    });

    if (!geminiResponse.ok) {
      const detail = await geminiResponse.text();
      return NextResponse.json(
        { error: `Gemini API 請求失敗：${detail || geminiResponse.statusText}` },
        { status: 502 },
      );
    }

    const data = await geminiResponse.json();
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("") || "";

    const jsonText = extractJsonObject(text);

    if (!jsonText) {
      return NextResponse.json(
        { error: "Gemini 回傳格式無法解析，請稍後再試。" },
        { status: 502 },
      );
    }

    const parsed = JSON.parse(jsonText) as Partial<ReadingResult>;
    const response: ReadingApiResponse = {
      result: safeResult(parsed),
      model: GEMINI_MODEL,
    };

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知錯誤";
    return NextResponse.json(
      { error: `目前無法完成解析，請稍後再試。${message}` },
      { status: 500 },
    );
  }
}


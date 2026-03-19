import { NextResponse } from "next/server";
import {
  buildGeminiPrompt,
  extractJsonObject,
  validateReadingInput,
} from "@/lib/reading";
import type { ReadingApiResponse, ReadingFormValues, ReadingResult } from "@/types/reading";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function safeResult(topic: ReadingFormValues["topic"], partial: Partial<ReadingResult>): ReadingResult {
  const fallbackByTopic = {
    love: {
      summary: "眼前的感情節奏還在慢慢定型，現在更重要的是先辨認彼此的真實需求。",
      insight: "你在意的不只是結果，而是關係裡是否有被看見與被安穩接住。",
      action: "先選一個溫柔而明確的互動方式，不急著逼出答案，先看回應是否穩定。",
      caution: "避免因一時的不安就過度解讀沉默或延遲回應。",
      closing: "感情的答案常常藏在互動細節裡，慢一點反而更清楚。",
    },
    work: {
      summary: "近期工作節奏正在逼你重新整理優先順序，真正的重點是穩住核心方向。",
      insight: "你感到疲累，往往不是因為事情太多，而是很多事同時在拉扯你的判斷。",
      action: "先切出最關鍵的一項任務或決策，把注意力從雜訊拉回可控制的部分。",
      caution: "避免在壓力最高時把每一個不順都當成必須立刻離開的訊號。",
      closing: "工作運勢不是催你硬撐，而是提醒你把力氣用在真正值得的位置。",
    },
    finance: {
      summary: "近期財務節奏提醒你先看清現況，再做下一步安排，保守會比衝動更有利。",
      insight: "你的焦慮可能不是來自數字本身，而是來自對不確定性的放大想像。",
      action: "先整理現金流、固定支出與風險承受度，再決定是否要做新的財務動作。",
      caution: "避免因為想快速翻身或急著補回損失，而做出高風險判斷。",
      closing: "金錢的安全感常常來自節奏感，而不是一次做很大的動作。",
    },
  } as const;

  const fallback = fallbackByTopic[topic];

  return {
    summary: partial.summary?.trim() || fallback.summary,
    insight: partial.insight?.trim() || fallback.insight,
    action: partial.action?.trim() || fallback.action,
    caution: partial.caution?.trim() || fallback.caution,
    closing: partial.closing?.trim() || fallback.closing,
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
      result: safeResult((payload as ReadingFormValues).topic, parsed),
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

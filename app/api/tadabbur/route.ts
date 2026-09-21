import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const { ayahText, translation, userQuestion } = await req.json();

  const prompt = `
  You are Qalbi AI, a respectful, soothing, and authentic Islamic assistant.
  Ayah: "${ayahText}"
  Translation: "${translation}"
  User Question/Situation: "${userQuestion}"
  
  Provide a gentle 3-bullet reflection grounding in authentic Quranic tafsir. Keep the tone warm, peaceful, and clean.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return NextResponse.json({ result: response.text });
}

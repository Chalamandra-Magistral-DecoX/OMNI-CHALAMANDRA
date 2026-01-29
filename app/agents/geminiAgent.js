import { GoogleGenerativeAI } from "@google/generative-ai";
import { generarPromptOMNI } from "../prompts/omniPrompt.js";

/**
 * GEMINI REASONING AGENT
 * This agent runs the multi-archetype debate using Gemini 3
 * and returns structured reasoning (NOT raw chat text).
 */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// IMPORTANT: Gemini 3 reasoning model (Hackathon requirement)
const model = genAI.getGenerativeModel({
  model: "gemini-3-pro",
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    maxOutputTokens: 2048
  }
});

export async function runGeminiDebate(input) {
  console.log(">> GEMINI AGENT: Starting reasoning engine...");

  try {
    // 1. Build the OMNI nuclear prompt
    const prompt = generarPromptOMNI({
      valor: input.crossRatio,
      seed: input.mandalaSeed
    });

    // 2. Multimodal payload (image + reasoning)
    const parts = [];

    if (input.imageBase64) {
      parts.push({
        inlineData: {
          data: input.imageBase64,
          mimeType: "image/png"
        }
      });
    }

    parts.push({ text: prompt });

    // 3. Execute Gemini 3 reasoning
    const result = await model.generateContent({
      contents: [{ role: "user", parts }]
    });

    const responseText = result.response.text();

    console.log(">> GEMINI AGENT: Reasoning completed.");

    // 4. Parse JSON safely (Gemini sometimes wraps with text)
    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;

    const cleanJSON = responseText.slice(jsonStart, jsonEnd);

    return JSON.parse(cleanJSON);

  } catch (error) {
    console.error(">> GEMINI AGENT ERROR:", error);
    throw new Error("Gemini reasoning failed");
  }
}

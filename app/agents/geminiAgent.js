import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildOmniPrompt } from "../prompts/omniPromptBuilder.js";

/**
 * GEMINI REASONING AGENT
 * =====================
 * OMNI-CHALAMANDRA CORE
 *
 * - Multimodal reasoning engine
 * - 6-agent cognitive debate
 * - Returns STRICT JSON only
 * - Hackathon Gemini 3 compliant
 */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3-pro",
  generationConfig: {
    temperature: 0.4,
    topP: 0.9,
    maxOutputTokens: 2048
  }
});

export async function runGeminiDebate(input) {
  console.log(">> GEMINI AGENT: Starting cognitive debate...");

  const prompt = buildOmniPrompt(input);

  try {
    const result = await model.generateContent([
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]);

    const rawText = result.response.text();

    // Clean markdown wrappers if Gemini adds them
    const cleaned = rawText
      .replace(/json/g, "")
      .replace(//g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    console.log(">> GEMINI AGENT: Debate completed successfully.");
    return parsed;

  } catch (error) {
    console.error(">> GEMINI AGENT ERROR:", error);

    return {
      error: true,
      source: "geminiAgent",
      message: error.message || "Gemini reasoning failure",
      jorge_panic_trigger: true
    };
  }
}

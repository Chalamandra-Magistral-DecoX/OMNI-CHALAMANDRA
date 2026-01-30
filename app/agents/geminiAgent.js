Geminiimport { GoogleGenerativeAI } from "@google/generative-ai";
import { buildOmniPrompt } from "../prompts/omniPromptBuilder.js";

/**
 * GEMINI REASONING AGENT
 * ----------------------
 * This agent is responsible for:
 * - Sending structured multimodal data to Gemini 3
 * - Orchestrating the 6-agent cognitive debate
 * - Returning a STRICT JSON blueprint (no free text)
 *
 * This is NOT a chatbot.
 * This is a reasoning engine.
 */

// Initialize Gemini 3 (AI Studio free tier)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// IMPORTANT: Gemini 3 model (hackathon compliant)
const model = genAI.getGenerativeModel({
  model: "gemini-3-pro",
  generationConfig: {
    temperature: 0.4,        // lower = less hallucination
    topP: 0.9,
    maxOutputTokens: 2048
  }
});

/**
 * Run the OMNI-CHALAMANDRA debate
 */
export async function runGeminiDebate(input) {
  console.log(">> GEMINI AGENT: Starting cognitive debate...");

  const prompt = buildOmniPrompt(input);

  try {
    const result = await model.generateContent([
      {
        role: "user",
        parts: [
          { text: prompt }
        ]
      }
    ]);

    const rawText = result.response.text();

    // Gemini sometimes wraps JSON in markdown – clean it
    const cleaned = rawText
      .replace(/json/g, "")
      .replace(//g, "")
      .trim();

    // Parse JSON strictly
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

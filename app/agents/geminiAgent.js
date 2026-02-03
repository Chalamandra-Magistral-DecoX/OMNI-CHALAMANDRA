// app/agents/geminiAgent.js
import { generateOmniCorePrompt } from "../config/configPrompt.js";

/**
 * GEMINI AGENT — OMNI-CHALAMANDRA
 * Model: Gemini 3 Pro
 */
export async function runGeminiDebate(input) {
  // Uses GitHub Secret injected via environment variable
  // Note: Ensure your build tool (Vite/Webpack) is configured to pass this.
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
  const MODEL_ID = "gemini-3-pro"; 

  const prompt = generateOmniCorePrompt(input);

  const response = await fetch(
    https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY},
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.0, // Fixed mathematical anchoring
          maxOutputTokens: 8192,
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(API Error ${response.status}: ${errorBody});
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}

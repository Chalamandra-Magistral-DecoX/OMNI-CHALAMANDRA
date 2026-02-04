/**
 * OMNI-CHALAMANDRA — GEMINI ADAPTER
 * Manages the 5-agent debate via Gemini 3 API
 */
import { GOOGLE_API_KEY } from "../config/secrets.js";

export async function runGeminiDebate(input) {
  const endpoint = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY};

  const systemPrompt = `
    You are OMNI-CHALAMANDRA, a multi-agent reasoning system. 
    Analyze the following Cross-Ratio: ${input.crossRatio}.
    
    DEBATE PARTICIPANTS:
    1. Scientist: Focus on physical stability and neural resonance.
    2. Philosopher: Focus on narrative meaning and archetypes.
    3. Psychologist: Focus on emotional response and healing.
    4. Historian: Focus on geometric lineage and techno-evolution.
    5. Futurist: Focus on future protocols and system expansion.
    
    RULES:
    - Each agent must provide a distinct insight.
    - DO NOT alter the mathematical Cross-Ratio.
    - Return ONLY a JSON object with the following keys: 
      { "scientist": "", "philosopher": "", "psychologist": "", "historian": "", "futurist": "" }
  `;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    return JSON.parse(textResponse);
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate debate transcript");
  }
}

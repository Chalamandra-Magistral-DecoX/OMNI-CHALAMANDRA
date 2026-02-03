// app/agents/geminiAgent.js
// FIXED PATH: Going up to reach config folder
import { generateOmniCorePrompt } from "../config/configPrompt.js";

export async function runGeminiDebate(input) {
  // Accessing API Key from environment
  const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) 
                  || (typeof process !== 'undefined' && process.env.GEMINI_API_KEY) 
                  || ""; 

  const MODEL_ID = "gemini-3-pro"; 
  const prompt = generateOmniCorePrompt(input);

  const url = https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY};

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.0,
          maxOutputTokens: 8192,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(API Error ${response.status}: ${errorBody});
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;

  } catch (error) {
    console.error(">> GEMINI AGENT ERROR:", error);
    throw error;
  }
}

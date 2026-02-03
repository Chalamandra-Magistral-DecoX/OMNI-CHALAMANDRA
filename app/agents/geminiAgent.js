// app/agents/geminiAgent.js
import { generateOmniCorePrompt } from "../config/configPrompt.js";

/**
 * GEMINI AGENT — OMNI-CHALAMANDRA
 * Model: Gemini 3 Pro
 */
export async function runGeminiDebate(input) {
  // Try to get the key from Vite, or process.env, or leave empty for GitHub Secrets
  const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) 
                  || (typeof process !== 'undefined' && process.env.GEMINI_API_KEY) 
                  || ""; 

  const MODEL_ID = "gemini-3-pro"; 

  const prompt = generateOmniCorePrompt(input);

  // Use BACKTICKS ( ` ) for the URL string
  const url = https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY};

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        contents: [{ 
          role: "user", 
          parts: [{ text: prompt }] 
        }],
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
    const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!outputText) {
      throw new Error("Empty response from Gemini 3 Pro");
    }

    return outputText;

  } catch (error) {
    console.error(">> GEMINI AGENT ERROR:", error);
    throw error;
  }
}

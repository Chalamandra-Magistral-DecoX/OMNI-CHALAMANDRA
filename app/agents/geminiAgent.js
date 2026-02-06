/**
 * OMNI-CHALAMANDRA — GEMINI ADAPTER
 * Manages the multi-agent debate using Gemini 3 Pro
 */
import { GOOGLE_API_KEY } from "../config/secrets.js";
import { SYSTEM_PROMPT } from "../config/configPrompt.js";

/**
 * Orchestrates the AI debate by sending deterministic signals to Gemini 3 Pro.
 * @param {Object} input - Contains crossRatio, computedValues, mandalaSeed, and hashChain.
 * @returns {Promise<Object>} The structured 5-agent debate and George's audit.
 */
export async function runGeminiDebate(input) {
  // Using Gemini 3 Pro to handle complex multi-agent logic and shadow auditing
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=${GOOGLE_API_KEY}`;

  const promptText = SYSTEM_PROMPT(
    input.crossRatio,
    input.computedValues,
    input.mandalaSeed,
    input.hashChain
  );

  const requestBody = {
    contents: [
      {
        parts: [
          { text: promptText }
        ]
      }
    ],
    generationConfig: {
      // Force JSON for interoperability with GEORGE and the Main Controller
      responseMimeType: "application/json",
      temperature: 0.8, // Slightly higher for more nuanced agent personas
      topP: 0.95,
      maxOutputTokens: 3000 // Higher limit to accommodate the full debate and audit
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini 3 Pro API Error: ${errorData.error.message || response.statusText}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0].content.parts[0].text) {
      throw new Error("Malformed response from Gemini 3 Pro model");
    }

    const result = JSON.parse(data.candidates[0].content.parts[0].text);

    console.log(">> GEMINI 3 PRO: Reasoning cycle and audit successfully synthesized.");
    return result;

  } catch (error) {
    console.error(">> GEMINI 3 PRO CRITICAL ERROR:", error);
    throw error;
  }
}

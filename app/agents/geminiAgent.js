/**
 * GEMINI AGENT — OMNI-CHALAMANDRA
 * Model: Gemini 3 (AI Studio)
 * Role: Multimodal Reasoning Engine
 *
 * Responsibilities:
 * - Build the FINAL core prompt
 * - Send reasoning request to Gemini 3
 * - Return RAW text output (debate + JSON)
 *
 * IMPORTANT:
 * - No validation here
 * - No Jorge logic here
 * - No UI logic here
 */

import { generateOmniCorePrompt } from "../config/configPrompt.js";

/**
 * Runs the Gemini 3 debate reasoning cycle
 * @param {Object} input - Normalized input from orchestrator
 * @returns {String} Raw Gemini output (text + JSON)
 */
export async function runGeminiDebate(input) {
  console.log(">> GEMINI AGENT: Initializing Gemini 3 reasoning...");

  const {
    crossRatio,
    mandalaSeed,
    computedValues,
    hashChain,
    imageBase64 // optional, future multimodal expansion
  } = input;

  // 1. Build the SINGLE source-of-truth prompt
  const prompt = generateOmniCorePrompt({
    crossRatio,
    mandalaSeed,
    computedValues,
    hashChain
  });

  try {
    // 2. Call Gemini 3 via AI Studio REST endpoint
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": Bearer ${process.env.GEMINI_API_KEY}
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt }

                // FUTURE MULTIMODAL HOOK (disabled for now)
                // imageBase64
                //   ? {
                //       inline_data: {
                //         mime_type: "image/png",
                //         data: imageBase64
                //       }
                //     }
                //   : null
              ].filter(Boolean)
            }
          ],
          generationConfig: {
            temperature: 0.4,          // disciplined reasoning
            topP: 0.9,
            maxOutputTokens: 4096,
            responseMimeType: "text/plain"
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        Gemini API error ${response.status}: ${errorText}
      );
    }

    const data = await response.json();

    const rawOutput =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawOutput) {
      throw new Error("Gemini returned empty response.");
    }

    console.log(">> GEMINI AGENT: Reasoning completed.");
    return rawOutput;

  } catch (error) {
    console.error(">> GEMINI AGENT ERROR:", error);
    throw error; // Let orchestrator decide panic / fallback
  }
}

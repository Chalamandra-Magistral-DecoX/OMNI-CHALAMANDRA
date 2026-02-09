/**
 * OMNI-CHALAMANDRA — GEMINI ADAPTER
 * Lead Developer: Dana Michelle Vargas
 * Brasdefer — Chalamandra Magistral
 * Project Initiative: DecoX
 *
 * Responsibility: Manages the multi-agent debate using Gemini 3 Pro
 */
import { GOOGLE_API_KEY } from "../config/secrets.js";
import { SYSTEM_PROMPT } from "../config/configPrompt.js";

/**
 * Orchestrates the AI debate by sending deterministic signals to Gemini 3 Pro.
 * @param {Object} input - Contains crossRatio, computedValues, mandalaSeed, and hashChain.
 * @returns {Promise<Object>} The structured 5-agent debate and George's audit.
 */
export async function runGeminiDebate(input) {
  // MOCK MODE: Check if API Key is valid
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === "YOUR_API_KEY_HERE") {
    console.warn(">> GEMINI: API Key missing. Activating Mock Reasoning Engine.");
    return generateMockDebate(input);
  }

  // Using Gemini 1.5 Pro (Standard stable version) to handle complex multi-agent logic
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY}`;

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
      temperature: 0,
      topP: 0.1,
      topK: 1,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          agent_insights: {
            type: "object",
            properties: {
              scientist: { type: "string" },
              philosopher: { type: "string" },
              psychologist: { type: "string" },
              historian: { type: "string" },
              futurist: { type: "string" }
            },
            required: ["scientist", "philosopher", "historian", "psychologist", "futurist"]
          },
          george_verdict: {
            type: "object",
            properties: {
              status: { type: "string", enum: ["STABILIZED", "WARNING", "CRITICAL"] },
              panic_triggered: { type: "boolean" },
              glitch_intensity: { type: "number" },
              final_verdict: { type: "string" },
              hallucination_score: { type: "number" }
            },
            required: ["status", "panic_triggered", "glitch_intensity", "final_verdict", "hallucination_score"]
          },
          output_signals: {
            type: "object",
            properties: {
              frequency_hz: { type: "number" },
              geometry: { type: "string" },
              coordination_index: { type: "number" }
            },
            required: ["frequency_hz", "geometry", "coordination_index"]
          }
        },
        required: ["agent_insights", "george_verdict", "output_signals"]
      }
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_LOW_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH"
      }
    ]
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

/**
 * GENERATE MOCK DEBATE — Fallback for when no API Key is provided.
 */
function generateMockDebate(input) {
  const R = input.crossRatio;
  const vals = input.computedValues;

  return {
    agent_insights: {
      scientist: `The invariant R=${R} suggests a highly consistent topological manifold.`,
      philosopher: `This alignment reflects the inherent duality of projective space.`,
      psychologist: `The visual harmony of the ${vals.geometry_category} state promotes cognitive ease.`,
      historian: `Structural resonance of this type mirrors early 20th century cybernetic theory.`,
      futurist: `Protocol integrity is maintained at a ${vals.coordination_index} coordination level.`
    },
    george_verdict: {
      status: "STABILIZED",
      panic_triggered: false,
      glitch_intensity: 0.0,
      final_verdict: "MOCK AUDIT: Internal consistency within nominal range.",
      hallucination_score: 0.0
    },
    output_signals: {
      frequency_hz: vals.frequency_hz,
      geometry: vals.geometry_category,
      coordination_index: vals.coordination_index
    }
  };
}

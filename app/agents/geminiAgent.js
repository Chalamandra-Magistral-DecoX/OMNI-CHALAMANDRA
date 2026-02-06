/**
 * OMNI-CHALAMANDRA — GEMINI ADAPTER
 * Manages the multi-agent debate using Gemini 3 Pro
 */
import { GOOGLE_API_KEY } from "../config/secrets.js";
import { SYSTEM_PROMPT } from "../config/prompt.js";

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

  // Mock mode for Hackathon/Demo when API key is not set
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === "YOUR_GOOGLE_API_KEY_HERE") {
    console.warn(">> GEMINI 3 PRO: No valid API key. Entering MOCK RESONANCE mode.");
    return {
      project: "OMNI-CHALAMANDRA",
      version: "3.5",
      timestamp: Date.now(),
      input_analysis: {
        cross_ratio: input.crossRatio,
        category: input.computedValues?.geometry_category || "STABLE"
      },
      output_signals: {
        frequency_hz: input.computedValues?.frequency_hz || 432,
        geometry: input.computedValues?.geometry_category || "STANDARD",
        coordination_index: input.computedValues?.coordination_index || 0.618
      },
      agent_insights: {
        scientist: "Mathematical resonance detected in the geometric distribution.",
        philosopher: "The cross-ratio suggests a return to harmonic principles.",
        psychologist: "Stable geometry promotes a sense of systemic security.",
        historian: "Similar patterns were observed during the Renaissance expansion.",
        futurist: "Geometric stability is a prerequisite for next-gen protocols."
      },
      george_verdict: {
        status: "STABLE",
        panic_triggered: false,
        glitch_intensity: 0.0,
        final_verdict: "Mock audit passed. Integrity verified in demo mode."
      },
      chain_data: {
        current_hash: input.hashChain?.current || "0xMOCK",
        iteration: input.hashChain?.iteration || 1
      }
    };
  }

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

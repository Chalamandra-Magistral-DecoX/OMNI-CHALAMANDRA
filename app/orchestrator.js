// app/orchestrator.js

import { runGeminiDebate } from "./agents/geminiAgent.js";
import { auditWithGeorge } from "./agents/georgeAgent.js";
import { validateOutput } from "./agents/validatorAgent.js";

/**
 * OMNI-CHALAMANDRA – COGNITIVE ORCHESTRATOR
 * Role:
 * - Coordinate Gemini 3 reasoning
 * - Apply Shadow Audit (George)
 * - Enforce schema safety
 * - Return deterministic payload to UI
 */
export async function orchestrateOMNI(input) {
  console.log(">> OMNI ORCHESTRATOR: Cognitive sequence initiated");
  console.log(>> INPUT: R=${input.crossRatio} | Seed=${JSON.stringify(input.mandalaSeed)});

  try {
    /* -----------------------------------------
       1. GEMINI 3 REASONING (5-AGENT DEBATE)
    ----------------------------------------- */
    const reasoningResult = await runGeminiDebate(input);

    /* -----------------------------------------
       2. SHADOW AUDIT (GEORGE)
    ----------------------------------------- */
    const auditedResult = auditWithGeorge(
      reasoningResult,
      input.crossRatio
    );

    /* -----------------------------------------
       3. SCHEMA VALIDATION
    ----------------------------------------- */
    const validation = validateOutput(auditedResult);

    if (!validation.isValid) {
      throw new Error(Schema violation: ${validation.error});
    }

    console.log(">> OMNI ORCHESTRATOR: Cognitive sequence completed");

    /* -----------------------------------------
       4. CLEAN PAYLOAD FOR UI
    ----------------------------------------- */
    return validation.payload;

  } catch (error) {
    console.error(">> OMNI ORCHESTRATOR: CRITICAL FAILURE", error);

    /* Hard fallback — UI-safe payload */
    return {
      error: true,
      message: error.message || "Cognitive synchronization failure",

      output_signals: {
        frequency_hz: 444,
        geometry: "CHAOTIC",
        coordination: 0
      },

      shadow_audit: {
        auditor: "GEORGE",
        panic_triggered: true,
        glitch_intensity: 1.0,
        final_verdict: "SYSTEM FAILURE — DO NOT TRUST OUTPUT"
      }
    };
  }
}

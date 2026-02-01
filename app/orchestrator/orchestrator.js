import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { validateOutput } from "../agents/validatorAgent.js";

import { renderMandala } from "../canvas/mandalaRenderer.js";
import { applyVisualFeedback } from "../feedback/visualEngine.js";
import { triggerGlitch } from "../feedback/glitchEngine.js";
import { playFrequency } from "../feedback/audioEngine.js";

/**
 * OMNI-CHALAMANDRA — CORE ORCHESTRATOR
 * Role:
 * - Coordinates reasoning (Gemini)
 * - Applies shadow audit (George)
 * - Enforces schema safety
 * - Dispatches feedback (audio / visual / glitch)
 *
 * This file is the cognitive backbone.
 * UI never talks to agents directly.
 */

export async function orchestrateOMNI(input) {
  console.log(">> OMNI ORCHESTRATOR: sequence started");
  console.log(>> CrossRatio=${input.crossRatio} | Seed=${JSON.stringify(input.mandalaSeed)});

  try {
    /* --------------------------------------------------
       1. REASONING PHASE — GEMINI 3
    -------------------------------------------------- */
    const reasoningResult = await runGeminiDebate(input);

    /* --------------------------------------------------
       2. SHADOW AUDIT — GEORGE (6th agent)
    -------------------------------------------------- */
    const auditedResult = auditWithGeorge(reasoningResult);

    /* --------------------------------------------------
       3. SCHEMA VALIDATION — ANTI-HALLUCINATION
    -------------------------------------------------- */
    const validation = validateOutput(auditedResult);

    if (!validation.isValid) {
      throw new Error(Schema violation: ${validation.error});
    }

    const payload = validation.payload;

    /* --------------------------------------------------
       4. RUNTIME FEEDBACK DISPATCH
    -------------------------------------------------- */

    // Visual geometry
    renderMandala(payload.output_signals);

    // Audio resonance
    playFrequency(payload.output_signals.frequency_hz);

    // UI visual feedback
    applyVisualFeedback(payload.output_signals);

    // Panic / glitch feedback
    if (payload.shadow_audit.panic_triggered === true) {
      triggerGlitch(payload.shadow_audit.glitch_intensity);
    }

    console.log(">> OMNI ORCHESTRATOR: sequence completed successfully");

    return payload;

  } catch (error) {
    console.error(">> OMNI ORCHESTRATOR: CRITICAL FAILURE", error);

    // Hard visual signal for the user
    triggerGlitch(1.0);

    // Controlled failure payload (UI-safe)
    return {
      error: true,
      message: error.message || "Critical synchronization failure",
      shadow_audit: {
        auditor: "GEORGE",
        panic_triggered: true,
        glitch_intensity: 1.0,
        final_verdict: "System entered safe mode due to invalid reasoning output."
      }
    };
  }
}

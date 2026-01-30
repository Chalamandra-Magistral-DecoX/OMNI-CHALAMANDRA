import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithJorge } from "../agents/jorgeAgent.js";
import { validateOutput } from "../agents/validatorAgent.js";
import { triggerPanic } from "../feedback/glitchEngine.js";

/**
 * OMNI-CHALAMANDRA ORCHESTRATOR
 * --------------------------------
 * Central nervous system of the application.
 * Coordinates:
 *  - Reality input (Canvas + Geometry)
 *  - Gemini 3 reasoning engine
 *  - Shadow audit (Jorge)
 *  - Schema validation
 *  - UI-safe output
 *
 * This is NOT a prompt wrapper.
 * This is a multi-agent orchestrated system.
 */

export async function orchestrateOMNI(input) {
  console.log(">> OMNI ORCHESTRATOR: Projection sequence initiated");
  console.log(>> PARAMETERS: R=${input.crossRatio} | Seed=${input.mandalaSeed});

  try {
    /* =====================================================
       1. INFERENCE PHASE — Gemini 3 Reasoning Engine
       ===================================================== */
    const rawDebate = await runGeminiDebate(input);

    /* =====================================================
       2. SHADOW AUDIT PHASE — Jorge (Real-World Validator)
       ===================================================== */
    const auditedResult = auditWithJorge(rawDebate, input.crossRatio);

    if (auditedResult.jorge_panic_trigger === true

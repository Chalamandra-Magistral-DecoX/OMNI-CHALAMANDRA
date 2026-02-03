// app/orchestrator.js
import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { validateOutput } from "../agents/validatorAgent.js";

/**
 * OMNI-CHALAMANDRA — CORE ORCHESTRATOR
 * Coordinates multi-agent reasoning and shadow auditing.
 */
export async function orchestrateOMNI(input) {
  console.log(">> OMNI ORCHESTRATOR: Sequence initiated");

  try {
    // 1. Multi-agent debate via Gemini 3 Pro
    const reasoningResult = await runGeminiDebate(input);

    // 2. Shadow Audit (George)
    const auditedResult = auditWithGeorge(reasoningResult);

    // 3. Schema Enforcement
    const validation = validateOutput(auditedResult);

    if (!validation.isValid) {
      throw new Error(Integrity Violation: ${validation.error});
    }

    return validation.payload;

  } catch (error) {
    console.error(">> OMNI ORCHESTRATOR: Critical System Failure", error);
    return {
      error: true,
      message: error.message,
      shadow_audit: { panic_triggered: true, glitch_intensity: 1.0 }
    };
  }
}

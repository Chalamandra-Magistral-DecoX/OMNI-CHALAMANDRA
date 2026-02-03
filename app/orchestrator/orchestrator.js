// app/orchestrator/orchestrator.js
// FIXED PATHS: Using "../" to go up one level and find agents
import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { validateOutput } from "../agents/validatorAgent.js";

/**
 * OMNI-CHALAMANDRA — CORE ORCHESTRATOR
 */
export async function orchestrateOMNI(input) {
  console.log(">> OMNI ORCHESTRATOR: Sequence initiated");

  try {
    const reasoningResult = await runGeminiDebate(input);
    const auditedResult = auditWithGeorge(reasoningResult);
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

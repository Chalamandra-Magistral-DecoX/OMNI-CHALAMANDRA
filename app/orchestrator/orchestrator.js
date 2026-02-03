/**
 * OMNI-CHALAMANDRA — CORE ORCHESTRATOR
 * Coordinates: Math -> Gemini -> GEORGE -> Validator
 */
import { computeInvariantSignals } from "../config/invariantconfig.js";
import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { validateOutput } from "../agents/validatorAgent.js";

export async function orchestrateOMNI(input) {
  console.log(">> OMNI ORCHESTRATOR: Sequence initiated");

  try {
    // 1. MATH LAYER: Compute deterministic signals before AI intervention
    const signals = computeInvariantSignals(input.crossRatio);
    
    // 2. ENRICHED INPUT: Pass signals to the agents
    const enrichedInput = {
      ...input,
      computedValues: signals,
      hashChain: {
        current: 0x${Math.random().toString(16).slice(2, 10)},
        iteration: 1
      }
    };

    // 3. REASONING LAYER: 5-Agent Debate via Gemini 3 Pro
    const debateTranscript = await runGeminiDebate(enrichedInput);

    // 4. AUDIT LAYER: Shadow Governance by GEORGE
    // GEORGE receives both the text and the pre-computed signals
    const auditedResult = auditWithGeorge(debateTranscript, enrichedInput);

    // 5. INTEGRITY LAYER: Schema validation
    const validation = validateOutput(JSON.stringify(auditedResult));

    if (!validation.isValid) {
      throw new Error(Integrity Violation: ${validation.errorMsg});
    }

    return validation.payload;

  } catch (error) {
    console.error(">> OMNI ORCHESTRATOR: Critical System Failure", error);
    return {
      error: true,
      message: error.message,
      shadow_audit: { 
        auditor: "GEORGE",
        panic_triggered: true, 
        glitch_intensity: 1.0,
        final_verdict: "SYSTEM HALTED: Verification Failure"
      }
    };
  }
}

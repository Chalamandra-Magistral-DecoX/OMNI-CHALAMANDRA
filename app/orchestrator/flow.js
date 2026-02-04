**
 * OMNI-CHALAMANDRA — CORE ORCHESTRATOR
 * Coordinates: Math -> Gemini -> GEORGE -> Validator
 */
import { computeInvariantSignals } from "../config/invariant.js";
import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { validateOutput } from "../agents/validatorAgent.js";

export async function orchestrateOMNI(input) {
  console.log(">> OMNI ORCHESTRATOR: Sequence initiated");

  try {
    // 1. MATH LAYER: Deterministic signals before AI intervention
    const signals = computeInvariantSignals(input.crossRatio);
    
    // 2. ENRICHED INPUT: Inject signals into agent context
    const enrichedInput = {
      ...input,
      computedValues: signals,
      hashChain: {
        current: 0x${Math.random().toString(16).slice(2, 10)},
        iteration: 1
      }
    };

    // 3. REASONING LAYER: 5-Agent Debate via Gemini 3
    const debateTranscript = await runGeminiDebate(enrichedInput);

    // 4. AUDIT LAYER: Shadow Governance by GEORGE
    const auditedResult = await auditWithGeorge(debateTranscript, enrichedInput);

    // 5. INTEGRITY LAYER: Schema validation
    const validation = validateOutput(auditedResult);

    if (!validation.isValid) {
      throw new Error(Integrity Violation: ${validation.errorMsg});
    }

    return validation.payload;

  } catch (error) {
    console.error(">> OMNI ORCHESTRATOR: Critical System Failure", error);
    
    // SAFETY FALLBACK: Activate Glitch Engine
    return {
      error: true,
      message: error.message,
      george_verdict: { 
        status: "PANIC", 
        panic_triggered: true, 
        glitch_intensity: 1.0,
        reason: "Mathematical or Integrity Drift detected."
      },
      visual_signals: { frequency_hz: 0, geometry: "collapsed" }
    };
  }
}

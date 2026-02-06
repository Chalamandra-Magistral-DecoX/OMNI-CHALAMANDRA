import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { calculateCrossRatio } from "../canvas/crossRatio.js";
import { analyzeColinearity } from "../canvas/colinearity.js";
import { computeInvariantSignals } from "../config/invariantConfig.js";

export async function orchestrateOMNI(points) {
  console.log(">> OMNI: Initiating reasoning sequence...");

  // 1. Deterministic Geometric Analysis
  const crossRatio = calculateCrossRatio(points);
  const colinearity = analyzeColinearity(points);
  const invariantSignals = computeInvariantSignals(crossRatio);

  const inputPayload = {
    crossRatio,
    computedValues: invariantSignals,
    mandalaSeed: { points: [...points] },
    hashChain: {
      current: "0x" + Math.random().toString(16).slice(2),
      previous: "0x" + Math.random().toString(16).slice(2),
      iteration: 1
    }
  };

  // 2. Generative Reasoning Layer (Gemini 3 Pro)
  const debate = await runGeminiDebate(inputPayload);

  // 3. Shadow Audit Layer (GEORGE)
  const auditResults = await auditWithGeorge(debate, inputPayload);

  // 4. Return unified payload for UI and Renderers
  return {
    input_analysis: {
      cross_ratio: crossRatio,
      points: points,
      colinearity: colinearity
    },
    debate: debate,
    george_verdict: auditResults.george_verdict,
    chain_data: {
      current_hash: inputPayload.hashChain.current,
      iteration: inputPayload.hashChain.iteration
    }
  };
}

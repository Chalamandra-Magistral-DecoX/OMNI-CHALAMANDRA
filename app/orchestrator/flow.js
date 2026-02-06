import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { analyzeColinearity } from "../canvas/colinearity.js";
import { calculateCrossRatio, categorizeCrossRatio } from "../canvas/crossRatio.js";
import { computeInvariantSignals } from "../config/invariantConfig.js";

export async function orchestrateOMNI(points) {
  console.log(">> OMNI: Initiating reasoning sequence...");

  // 1. Deterministic Geometric Analysis
  const crossRatio = calculateCrossRatio(points);
  const colinearity = analyzeColinearity(points);
  const category = categorizeCrossRatio(crossRatio);
  const computedValues = computeInvariantSignals(crossRatio);

  const chainData = {
    current_hash: `0x${Math.random().toString(16).slice(2)}`,
    previous_hash: "GENESIS",
    iteration: 1
  };

  const inputPayload = {
    crossRatio,
    category,
    colinearity,
    mandalaSeed: { points: [...points] },
    computedValues,
    hashChain: {
      current: chainData.current_hash,
      previous: chainData.previous_hash,
      iteration: chainData.iteration
    }
  };

  // 2. Generative Reasoning Layer (Gemini 3 Pro)
  const debate = await runGeminiDebate(inputPayload);

  // 3. Shadow Audit Layer (GEORGE)
  // We pass the debate results and the original math for verification
  const auditResults = await auditWithGeorge(debate, inputPayload);

  // 4. Return unified payload for UI and Renderers
  // This object structure is the "Source of Truth" for the entire app
  return {
    input_analysis: {
      cross_ratio: crossRatio,
      points: points,
      colinearity: colinearity
    },
    debate, // Contains agent_insights and output_signals
    george_verdict: auditResults.george_verdict,
    computed_signals: computedValues,
    chain_data: chainData
  };
}

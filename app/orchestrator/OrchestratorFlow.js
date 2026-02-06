import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/GeorgeAgent.js";
import { calculateCrossRatio } from "../canvas/crossRatio.js";
import { analyzeColinearity } from "../canvas/colinearityGuide.js";
import { computeInvariantSignals } from "../config/invariantConfig.js";

export async function orchestrateOMNI(points) {
  console.log(">> OMNI: Initiating reasoning sequence...");

  // 1. Deterministic Geometric Analysis
  const crossRatio = calculateCrossRatio(points);
  const colinearity = analyzeColinearity(points);

  // Using the original Invariant Engine
  const invariantSignals = computeInvariantSignals(crossRatio);
  const category = invariantSignals.geometry_category;

  const inputPayload = {
    crossRatio,
    category,
    colinearity,
    computedValues: invariantSignals,
    mandalaSeed: { points: [...points] },
    hashChain: {
      current_hash: "0x" + Math.random().toString(16).slice(2), 
      timestamp: Date.now() 
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
      colinearity: colinearity,
      invariant_signals: invariantSignals
    },
    debate: debate,
    george_verdict: auditResults.george_verdict,
    chain_data: inputPayload.hashChain
  };
}

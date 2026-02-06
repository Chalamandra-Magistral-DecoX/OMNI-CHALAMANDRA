import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/georgeAgent.js";
import { calculateCrossRatio } from "../canvas/crossRatio.js";
import { analyzeColinearity } from "../canvas/colinearity.js";

/**
 * OMNI-CHALAMANDRA — INVARIANT ENGINE (Internalized)
 * Computes deterministic signals from the Cross-Ratio
 */
function computeInvariantSignals(R) {
  const frequency = Math.min(Math.max(200 + (R * 100), 200), 800);
  const phi = 1.61803398875;
  const coordination = 1 - Math.min(Math.abs(R - phi) / phi, 1);

  let category = "STANDARD";
  if (R === 1) category = "DEGENERATE_LINEAR";
  if (Math.abs(R - phi) < 0.1) category = "HARMONIC_GOLDEN";
  if (R < 0) category = "PARADIGM_INVERSION";
  if (R > 2.0) category = "DISRUPTIVE_EXPANSION";

  return {
    frequency_hz: Math.round(frequency),
    coordination_index: parseFloat(coordination.toFixed(4)),
    geometry_category: category,
    stability_score: parseFloat((coordination * 100).toFixed(2))
  };
}

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

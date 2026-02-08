/**
 * OMNI-CHALAMANDRA — Orchestrator Flow
 * Lead Developer: Dana Michelle Vargas
 * Brasdefer — Chalamandra Magistral
 * Project Initiative: DecoX
 */

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

  // Use the central Invariant Engine for stability signals
  const signals = computeInvariantSignals(crossRatio);

  const inputPayload = {
    crossRatio,
    mandalaSeed: { points: [...points] },
    computedValues: {
      frequency_hz: signals.frequency_hz,
      coordination_index: signals.coordination_index,
      stability_score: signals.stability_score,
      geometry_category: signals.geometry_category,
      colinearity_score: colinearity.alignmentScore
    },
    hashChain: {
      current: "0x" + Math.random().toString(16).slice(2),
      previous: "0xGENESIS",
      iteration: 1
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
    debate: debate, // Contains agent_insights and output_signals
    george_verdict: auditResults.george_verdict,
    chain_data: {
      current_hash: inputPayload.hashChain.current,
      iteration: inputPayload.hashChain.iteration
    }
  };
}

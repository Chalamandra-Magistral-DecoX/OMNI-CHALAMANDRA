import { runGeminiDebate } from "../agents/geminiAgent.js";
import { auditWithGeorge } from "../agents/GeorgeAgent.js";
import { calculateCrossRatio, categorizeCrossRatio } from "../canvas/crossRatio.js";
import { analyzeColinearity } from "../canvas/colinearityGuide.js";

export async function orchestrateOMNI(points) {
  console.log(">> OMNI: Initiating reasoning sequence...");

  // 1. Deterministic Geometric Analysis
  const crossRatio = calculateCrossRatio(points);
  const colinearity = analyzeColinearity(points);
  const category = categorizeCrossRatio(crossRatio);

  const inputPayload = {
    crossRatio,
    mandalaSeed: { points: [...points] },
    computedValues: {
      frequency_hz: Math.round(400 + (Math.abs(crossRatio) * 20)),
      coordination_index: colinearity.alignmentScore,
      stability_score: Math.round(colinearity.alignmentScore * 100),
      geometry_category: category
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

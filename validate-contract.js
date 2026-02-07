
import { orchestrateOMNI } from './app/orchestrator/flow.js';

/**
 * OMNI-CHALAMANDRA — Contract Validation Test
 * This script verifies that the orchestrator returns the exact payload structure required
 * by the governance contract.
 */
async function validateContract() {
  const mockPoints = [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 }, { x: 400, y: 100 }];

  try {
    // Force mock mode if no key
    if (!process.env.GOOGLE_API_KEY) process.env.GOOGLE_API_KEY = "";

    const payload = await orchestrateOMNI(mockPoints);
    const topLevelKeys = Object.keys(payload);
    const expectedKeys = ["input_analysis", "debate", "george_verdict", "chain_data"];

    const missing = expectedKeys.filter(k => !topLevelKeys.includes(k));
    const extra = topLevelKeys.filter(k => !expectedKeys.includes(k));

    if (missing.length > 0 || extra.length > 0) {
      throw new Error(`Contract Violation: Keys do not match. Missing: ${missing}, Extra: ${extra}`);
    }

    if (!payload.debate.agent_insights || !payload.debate.output_signals) {
      throw new Error("Contract Violation: Missing nested debate signals.");
    }

    console.log("✅ CONTRACT VERIFIED: Orchestrator payload structure is STABLE.");
  } catch (error) {
    console.error("❌ CONTRACT VALIDATION FAILED:", error.message);
    process.exit(1);
  }
}

validateContract();

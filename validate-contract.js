/**
 * OMNI-CHALAMANDRA — CONTRACT VALIDATOR
 * Responsibility: Enforces the return payload schema for the orchestrator
 * and ensures compliance with the Shadow Governance policy.
 */

function validateContract(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: ["Payload is null or not an object"] };
  }

  // 1. Root Keys Check
  const requiredRootKeys = ["input_analysis", "debate", "george_verdict", "chain_data"];
  requiredRootKeys.forEach(key => {
    if (!payload.hasOwnProperty(key)) {
      errors.push(`MISSING_ROOT_KEY: ${key}`);
    }
  });

  if (errors.length > 0) return { valid: false, errors };

  // 2. Input Analysis Validation
  const { input_analysis } = payload;
  if (typeof input_analysis.cross_ratio !== "number") errors.push("INVALID_TYPE: input_analysis.cross_ratio must be a number");
  if (!Array.isArray(input_analysis.points)) errors.push("INVALID_TYPE: input_analysis.points must be an array");

  // 3. Debate Layer Validation (Gemini Output)
  const { debate } = payload;
  const requiredDebateKeys = ["agent_insights", "george_verdict", "output_signals"];
  requiredDebateKeys.forEach(key => {
    if (!debate.hasOwnProperty(key)) errors.push(`MISSING_DEBATE_KEY: debate.${key}`);
  });

  if (debate.agent_insights) {
    const agents = ["scientist", "philosopher", "psychologist", "historian", "futurist"];
    agents.forEach(agent => {
      if (typeof debate.agent_insights[agent] !== "string") {
        errors.push(`INVALID_AGENT_INSIGHT: ${agent} must be a string`);
      }
    });
  }

  if (debate.output_signals) {
    if (typeof debate.output_signals.frequency_hz !== "number") errors.push("INVALID_SIGNAL: frequency_hz must be a number");
    if (typeof debate.output_signals.coordination_index !== "number") errors.push("INVALID_SIGNAL: coordination_index must be a number");
  }

  // 4. George Shadow Audit (Final Authority)
  const { george_verdict } = payload;
  const validStatuses = ["STABILIZED", "WARNING", "CRITICAL"];
  if (!validStatuses.includes(george_verdict.status)) {
    errors.push(`INVALID_STATUS: george_verdict.status must be one of ${validStatuses.join(", ")}`);
  }
  if (typeof george_verdict.panic_triggered !== "boolean") errors.push("INVALID_TYPE: george_verdict.panic_triggered must be a boolean");
  if (typeof george_verdict.drift_score !== "number") errors.push("INVALID_TYPE: george_verdict.drift_score must be a number");

  // 5. Chain Data Validation
  const { chain_data } = payload;
  if (!chain_data.current_hash || typeof chain_data.current_hash !== "string") {
    errors.push("INVALID_CHAIN_DATA: current_hash missing or invalid");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Support Node.js export for CI/CD
export { validateContract };

/**
 * SELF-TEST (When run via 'node validate-contract.js')
 */
if (typeof process !== "undefined" && process.argv && process.argv[1] && process.argv[1].includes("validate-contract.js")) {
  const testPayload = {
    input_analysis: {
      cross_ratio: 1.618,
      points: [{x:0, y:0}, {x:1, y:1}, {x:2, y:2}, {x:3, y:3}]
    },
    debate: {
      agent_insights: {
        scientist: "Insight",
        philosopher: "Insight",
        psychologist: "Insight",
        historian: "Insight",
        futurist: "Insight"
      },
      george_verdict: {
        status: "STABILIZED",
        panic_triggered: false,
        glitch_intensity: 0.0,
        final_verdict: "Internal check pass",
        hallucination_score: 0.0
      },
      output_signals: {
        frequency_hz: 432,
        geometry: "BALANCED",
        coordination_index: 0.8
      }
    },
    george_verdict: {
      status: "STABILIZED",
      panic_triggered: false,
      drift_score: 0.1,
      glitch_intensity: 0.1,
      final_verdict: "Shadow audit pass",
      hallucination_score: 0.1
    },
    chain_data: {
      current_hash: "0xHASH123",
      iteration: 1
    }
  };

  const result = validateContract(testPayload);
  if (result.valid) {
    console.log(">> CONTRACT VALIDATION: SUCCESS");
    process.exit(0);
  } else {
    console.error(">> CONTRACT VALIDATION: FAILED", result.errors);
    process.exit(1);
  }
}

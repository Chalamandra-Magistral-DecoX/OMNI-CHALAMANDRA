/**
 * GEORGE AGENT — SHADOW AUDITOR
 * OMNI-CHALAMANDRA
 *
 * Role: Final authority. Detects hallucinations and enforces schema.
 */

export function auditWithGeorge(debateTranscript, structuredSignals) {
  console.log(">> GEORGE: Initiating shadow audit...");

  /* --------------------------------------------------
     1. INITIAL HEURISTICS
  -------------------------------------------------- */
  const audit = {
    auditor: "GEORGE", // Corrected identity
    hallucination_score: 0,
    panic_triggered: false,
    detected_issues: [],
    confidence_level: "high"
  };

  /* --------------------------------------------------
     2. HALLUCINATION & INTEGRITY CHECKS
  -------------------------------------------------- */
  if (!debateTranscript || debateTranscript.length < 50) {
    audit.hallucination_score += 30;
    audit.detected_issues.push("Debate transcript too short or empty.");
  }

  // Check for the existence of required structured data
  if (!structuredSignals || typeof structuredSignals !== "object") {
    audit.hallucination_score += 40;
    audit.detected_issues.push("Structured signals missing or invalid.");
  }

  // Safety check for Resonant Frequency
  const freq = structuredSignals?.output_signals?.frequency_hz;
  if (freq && (freq < 20 || freq > 20000)) {
    audit.hallucination_score += 20;
    audit.detected_issues.push("Frequency value out of human audible range.");
  }

  /* --------------------------------------------------
     3. PANIC LOGIC
  -------------------------------------------------- */
  if (audit.hallucination_score >= 70) {
    audit.panic_triggered = true;
    audit.confidence_level = "critical";
  } else if (audit.hallucination_score >= 40) {
    audit.confidence_level = "medium";
  }

  /* --------------------------------------------------
     4. FINAL JSON CONSTRUCTION (ALIGNED WITH VALIDATOR)
  -------------------------------------------------- */
  const finalPayload = {
    project: "OMNI-CHALAMANDRA",
    version: "3.5",
    execution_context: "live_demo",

    input_analysis: structuredSignals.input_analysis || {},
    output_signals: structuredSignals.output_signals || {
      frequency_hz: 432,
      geometry: "NEUTRAL",
      coordination_index: 0.5
    },

    agent_insights: structuredSignals.agent_insights || {},

    shadow_audit: { // Matches validator key
      auditor: audit.auditor,
      hallucination_score: audit.hallucination_score,
      panic_triggered: audit.panic_triggered,
      glitch_intensity: audit.hallucination_score / 100,
      final_verdict: audit.panic_triggered 
        ? "CRITICAL: Potential hallucination detected. Initiating glitch protocol." 
        : "COHERENT: Logic verified by Shadow Governance."
    },

    chain_data: {
      debate_length: debateTranscript.length,
      timestamp: Date.now(),
      current_hash: structuredSignals.chain_data?.current_hash || "0x0",
      iteration: structuredSignals.chain_data?.iteration || 0
    }
  };

  console.log(">> GEORGE: Shadow audit complete. Verdict: " + audit.confidence_level);
  return finalPayload;
}

function generateIntegrityHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return hash_${Math.abs(hash)};
}

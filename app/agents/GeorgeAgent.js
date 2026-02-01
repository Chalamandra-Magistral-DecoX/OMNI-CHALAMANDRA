/**
 * GEORGE AGENT — SHADOW AUDITOR
 * OMNI-CHALAMANDRA
 *
 * Role:
 * - Final authority after multi-agent debate
 * - Detect hallucinations, contradictions, and weak inferences
 * - Produce the ONLY accepted final JSON output
 *
 * George does NOT debate.
 * George audits.
 */

export function GeorgeAgent(debateTranscript, structuredSignals) {
  console.log(">> GEORGE: Initiating shadow audit...");

  /* --------------------------------------------------
     1. INITIAL HEURISTICS
  -------------------------------------------------- */

  const audit = {
    auditor: "JORGE", // Shadow identity (as defined)
    hallucination_score: 0,
    panic_triggered: false,
    detected_issues: [],
    confidence_level: "high"
  };

  /* --------------------------------------------------
     2. HALLUCINATION CHECKS
  -------------------------------------------------- */

  if (!debateTranscript || debateTranscript.length < 50) {
    audit.hallucination_score += 30;
    audit.detected_issues.push("Debate transcript too short or empty.");
  }

  if (!structuredSignals || typeof structuredSignals !== "object") {
    audit.hallucination_score += 40;
    audit.detected_issues.push("Structured signals missing or invalid.");
  }

  if (
    structuredSignals &&
    structuredSignals.frequency_hz &&
    (structuredSignals.frequency_hz < 0 || structuredSignals.frequency_hz > 10000)
  ) {
    audit.hallucination_score += 20;
    audit.detected_issues.push("Frequency value out of plausible range.");
  }

  /* --------------------------------------------------
     3. CONTRADICTION DETECTION
  -------------------------------------------------- */

  if (
    structuredSignals?.dominant_layer === "symbolic" &&
    structuredSignals?.confidence_score < 0.4
  ) {
    audit.hallucination_score += 15;
    audit.detected_issues.push(
      "High symbolic dominance with low confidence score."
    );
  }

  /* --------------------------------------------------
     4. PANIC LOGIC
  -------------------------------------------------- */

  if (audit.hallucination_score >= 70) {
    audit.panic_triggered = true;
    audit.confidence_level = "critical";
  } else if (audit.hallucination_score >= 40) {
    audit.confidence_level = "medium";
  }

  /* --------------------------------------------------
     5. FINAL JSON CONSTRUCTION
     (THIS IS THE ONLY ACCEPTED OUTPUT)
  -------------------------------------------------- */

  const finalPayload = {
    hackathon_project: "OMNI-CHALAMANDRA",
    engine_version: "Gemini Hackathon 3",
    audit_layer: "Shadow Governance",

    input_analysis: structuredSignals.input_analysis || {},
    output_signals: structuredSignals.output_signals || {},

    dominant_layer: structuredSignals.dominant_layer || "undefined",

    agent_insights: structuredSignals.agent_insights || [],

    shadow_verdict: {
      auditor: audit.auditor,
      hallucination_score: audit.hallucination_score,
      confidence_level: audit.confidence_level,
      detected_issues: audit.detected_issues,
      panic_triggered: audit.panic_triggered
    },

    action_plan: audit.panic_triggered
      ? [
          "Invalidate output",
          "Request human verification",
          "Reduce model autonomy"
        ]
      : [
          "Approve output",
          "Render to Canvas",
          "Export chain data"
        ],

    chain_data: {
      debate_length: debateTranscript.length,
      timestamp: new Date().toISOString(),
      integrity_hash: generateIntegrityHash(debateTranscript)
    }
  };

  console.log(">> GEORGE: Shadow audit complete.");
  return finalPayload;
}

/* --------------------------------------------------
   INTERNAL UTILITIES
-------------------------------------------------- */

function generateIntegrityHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return hash_${Math.abs(hash)};
}

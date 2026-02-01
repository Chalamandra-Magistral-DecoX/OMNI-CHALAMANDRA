/**
 * OMNI-CHALAMANDRA — FINAL EXPORT MODULE
 * File: app/export/exportJson.js
 *
 * Purpose:
 * - Export the FULL cognitive process
 * - Preserve the 5-agent debate + George's final decision
 * - Hackathon / judge-ready downloadable artifact
 */

export function exportJsonPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("EXPORT ERROR: Invalid payload object");
  }

  // Fallback export if the system failed upstream
  if (payload.error === true) {
    return JSON.stringify(
      {
        export_status: "FAILED",
        project: "OMNI-CHALAMANDRA",
        timestamp: Date.now(),
        error_message: payload.message || "Unknown system failure"
      },
      null,
      2
    );
  }

  const exportObject = {
    export_status: "SUCCESS",
    project: "OMNI-CHALAMANDRA",
    execution_mode: "hackathon_demo",
    timestamp: Date.now(),

    /* ----------------------------------
       1. FULL DEBATE LOG (HUMAN READABLE)
       5 AGENTS + GEORGE AS FINAL CLOSURE
    ---------------------------------- */
    debate_log: {
      scientist: payload.debate_log?.scientist || "",
      philosopher: payload.debate_log?.philosopher || "",
      psychologist: payload.debate_log?.psychologist || "",
      historian: payload.debate_log?.historian || "",
      futurist: payload.debate_log?.futurist || "",

      george_final_audit: payload.shadow_audit?.final_verdict || ""
    },

    /* ----------------------------------
       2. GEORGE — FINAL DECISION (EXPLICIT)
       Sixth agent, system closer
    ---------------------------------- */
    george_decision: {
      auditor: "GEORGE",
      street_viability: payload.shadow_audit?.street_viability,
      hallucination_score: payload.shadow_audit?.hallucination_score,
      panic_triggered: payload.shadow_audit?.panic_triggered,
      glitch_intensity: payload.shadow_audit?.glitch_intensity,
      final_words: payload.shadow_audit?.final_verdict
    },

    /* ----------------------------------
       3. STRUCTURED PAYLOAD (SYSTEM USE)
       Deterministic JSON used by the app
    ---------------------------------- */
    structured_payload: payload
  };

  return JSON.stringify(exportObject, null, 2);
}

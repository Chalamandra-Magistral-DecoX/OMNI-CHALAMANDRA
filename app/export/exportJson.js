// app/export/exportJson.js

export function exportResultJSON(finalPayload) {
  const {
    debate,
    george,
    signals,
    crossRatio,
    hashChain
  } = finalPayload;

  const exportObject = {
    project: "OMNI-CHALAMANDRA",
    version: "3.5",
    execution_context: "hackathon_demo",

    timestamp: new Date().toISOString(),

    geometry_input: {
      cross_ratio: crossRatio,
      geometry_category: signals.geometryCategory,
      stability_score: signals.stabilityScore
    },

    cognitive_signals: {
      frequency_hz: signals.frequencyHz,
      coordination_index: signals.coordinationIndex
    },

    agent_debate: {
      scientist: debate.scientist,
      philosopher: debate.philosopher,
      psychologist: debate.psychologist,
      historian: debate.historian,
      futurist: debate.futurist
    },

    final_audit: {
      auditor: "GEORGE",
      street_viability: george.streetViability,
      hallucination_score: george.hallucinationScore,
      panic_triggered: george.panicTriggered,
      glitch_intensity: george.glitchIntensity,
      final_verdict: george.finalWords
    },

    action_protocol: george.actionProtocol,

    chain_data: {
      current_hash: hashChain.current,
      previous_hash: hashChain.previous || "GENESIS",
      iteration: hashChain.iteration
    }
  };

  // Browser-friendly download
  const blob = new Blob(
    [JSON.stringify(exportObject, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "omni-chalamandra-result.json";
  a.click();

  URL.revokeObjectURL(url);

  return exportObject;
}

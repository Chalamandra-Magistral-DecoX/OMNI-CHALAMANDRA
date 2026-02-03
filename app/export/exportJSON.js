/**
 * EXPORT JSON — OMNI-CHALAMANDRA
 * Responsibility: Create a downloadable artifact of the reasoning process.
 */

export function exportResultJSON(finalPayload) {
  // Ajustamos el destructuring para que coincida con la estructura real del payload
  const {
    agent_insights,
    shadow_audit,
    output_signals,
    input_analysis,
    chain_data
  } = finalPayload;

  const exportObject = {
    project: "OMNI-CHALAMANDRA",
    version: "3.5",
    execution_context: "hackathon_demo",
    timestamp: new Date().toISOString(),

    geometry_input: {
      cross_ratio: input_analysis?.cross_ratio,
      geometry_category: output_signals?.geometry,
    },

    cognitive_signals: {
      frequency_hz: output_signals?.frequency_hz,
      coordination_index: output_signals?.coordination_index
    },

    agent_debate: agent_insights, // Ya viene estructurado por agentes

    final_audit: {
      auditor: "GEORGE",
      panic_triggered: shadow_audit?.panic_triggered,
      glitch_intensity: shadow_audit?.glitch_intensity,
      final_verdict: shadow_audit?.final_verdict
    },

    chain_data: {
      current_hash: chain_data?.current_hash,
      iteration: chain_data?.iteration
    }
  };

  // Browser-friendly download logic
  try {
    const blob = new Blob(
      [JSON.stringify(exportObject, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = omni-audit-${Date.now()}.json;
    document.body.appendChild(a); // Requisito para algunos navegadores
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(">> EXPORT: Audit JSON downloaded successfully.");
  } catch (error) {
    console.error(">> EXPORT ERROR:", error);
  }

  return exportObject;
}

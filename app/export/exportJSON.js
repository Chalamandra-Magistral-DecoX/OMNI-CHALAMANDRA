/**
 * EXPORT JSON — OMNI-CHALAMANDRA
 * Responsibility: Generate a downloadable audit trail of the reasoning process.
 */

export function exportResultJSON(finalPayload) {
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

    agent_debate: agent_insights,

    shadow_audit: {
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

  try {
    const dataStr = JSON.stringify(exportObject, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = omni_audit_${Date.now()}.json;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(">> EXPORT: Audit report generated successfully.");
  } catch (error) {
    console.error(">> EXPORT ERROR: Failed to generate JSON file.", error);
  }

  return exportObject;
}

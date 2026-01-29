/**
 * JORGE — SHADOW AUDITOR AGENT
 * Real-world realism injection.
 * Detects hallucinations, over-optimism and symbolic bullshit.
 */

export function auditWithJorge(geminiOutput, crossRatio) {
  console.log(">> JORGE: Starting shadow audit...");

  const audit = {
    ...geminiOutput,
    jorge_panic_trigger: false,
    jorge_flags: []
  };

  /* ---------------------------------------
     RULE 1: Unrealistic coordination index
  --------------------------------------- */
  if (geminiOutput.indice_coordinacion > 0.95) {
    audit.jorge_flags.push("Suspiciously perfect coordination");
  }

  /* ---------------------------------------
     RULE 2: Missing layers
  --------------------------------------- */
  const requiredLayers = ["NEURO", "NARRATIVA", "SANACIÓN", "TECNO", "PROTOCOLO"];
  if (!geminiOutput.analisis_por_capa) {
    audit.jorge_flags.push("Missing layer analysis");
  } else {
    requiredLayers.forEach(layer => {
      if (!geminiOutput.analisis_por_capa[layer]) {
        audit.jorge_flags.push(Missing analysis for layer: ${layer});
      }
    });
  }

  /* ---------------------------------------
     RULE 3: Cross Ratio anomaly detection
  --------------------------------------- */
  if (crossRatio < 0 || crossRatio > 10) {
    audit.jorge_flags.push("Cross-ratio anomaly detected");
  }

  /* ---------------------------------------
     RULE 4: Empty Jorge verdict (ironic)
  --------------------------------------- */
  if (!geminiOutput.veredicto_jorge || geminiOutput.veredicto_jorge.length < 10) {
    audit.jorge_flags.push("JORGE verdict too soft or missing");
  }

  /* ---------------------------------------
     DECISION: Panic or pass
  --------------------------------------- */
  if (audit.jorge_flags.length >= 2) {
    audit.jorge_panic_trigger = true;
    audit.veredicto_jorge =
      "JORGE: Too many red flags. System smells like theoretical bullshit. Triggering panic mode.";
  } else {
    audit.veredicto_jorge =
      "JORGE: Output survived street reality check. Still watching you.";
  }

  console.log(">> JORGE AUDIT FLAGS:", audit.jorge_flags);

  return audit;
}

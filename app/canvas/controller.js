/**
 * CANVAS CONTROLLER — OMNI-CHALAMANDRA
 * Responsibility: Receive final payload and execute the visual render pipeline.
 */

import { renderMandala } from "./mandalaRenderer.js";
import { analyzeColinearity } from "./colinearityGuide.js";
import { calculateCrossRatio } from "./crossRatio.js";

export function CanvasController(finalPayload) {
  console.log(">> CANVAS: Initializing render pipeline...");

  /* --------------------------------------------------
     1. SAFETY CHECK — GEORGE AUTHORITY
  -------------------------------------------------- */
  // Sincronizado con shadow_audit (GEORGE)
  if (!finalPayload?.shadow_audit) {
    console.error("Canvas blocked: Shadow audit missing.");
    return { status: "ABORTED", reason: "Audit missing" };
  }

  if (finalPayload.shadow_audit.panic_triggered === true) {
    console.warn(">> CANVAS: Panic triggered. Rendering glitch state.");
    // Aquí el sistema podría disparar un efecto visual de error
    return {
      status: "PANIC",
      reason: finalPayload.shadow_audit.final_verdict
    };
  }

  /* --------------------------------------------------
     2. EXTRACT CORE SIGNALS
  -------------------------------------------------- */
  const {
    input_analysis,
    output_signals,
    chain_data
  } = finalPayload;

  const crossRatio = input_analysis?.cross_ratio || 1.0;
  const frequencyHz = output_signals?.frequency_hz || 432;
  const geometryType = output_signals?.geometry || "SPIRAL";

  /* --------------------------------------------------
     3. GEOMETRIC PRE-PROCESSING
  -------------------------------------------------- */
  // Validamos la colinealidad final para el rendering
  const colinearityData = analyzeColinearity(input_analysis?.points || []);

  /* --------------------------------------------------
     4. EXECUTE RENDERING
  -------------------------------------------------- */
  try {
    // Renderizamos el Mandala usando los datos auditados por GEORGE
    renderMandala(geometryType);

    console.log(">> CANVAS: Render successful.");

    return {
      status: "SUCCESS",
      render_mode: "STABILIZED",
      visual_parameters: {
        geometry: geometryType,
        frequency_hz: frequencyHz,
        tension: colinearityData.tension
      },
      metadata: {
        hash: chain_data?.current_hash || "0x0",
        timestamp: chain_data?.timestamp || Date.now()
      }
    };

  } catch (error) {
    console.error(">> CANVAS RENDER ERROR:", error);
    return { status: "ERROR", message: error.message };
  }
}

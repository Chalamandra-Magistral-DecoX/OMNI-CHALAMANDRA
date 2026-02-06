/**
 * CANVAS CONTROLLER — OMNI-CHALAMANDRA
 * Responsibility: Receive final payload and execute the visual render pipeline.
 */

import { renderMandala } from "./mandalaRenderer.js";
import { analyzeColinearity } from "./colinearity.js"; // Sincronizado con el nombre de archivo anterior

export function CanvasController(finalPayload) {
  console.log(">> CANVAS: Initializing render pipeline...");

  /* --------------------------------------------------
     1. SAFETY CHECK — GEORGE AUTHORITY
  -------------------------------------------------- */
  // Sincronizado con la estructura de GEORGE (george_verdict)
  const audit = finalPayload?.george_verdict;

  if (!audit) {
    console.error("Canvas blocked: Shadow audit missing.");
    return { status: "ABORTED", reason: "Audit missing" };
  }

  if (audit.panic_triggered === true) {
    console.warn(">> CANVAS: Panic triggered. Rendering glitch state.");
    // El GlitchEngine se encarga del visual, aquí abortamos el render limpio
    return {
      status: "PANIC",
      reason: audit.final_verdict || audit.reason
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
  const geometryType = output_signals?.geometry || "STANDARD";

  /* --------------------------------------------------
     3. GEOMETRIC PRE-PROCESSING
  -------------------------------------------------- */
  // Extraemos los puntos del análisis de entrada para validar la tensión
  const colinearityData = analyzeColinearity(input_analysis?.points || []);

  /* --------------------------------------------------
     4. EXECUTE RENDERING
  -------------------------------------------------- */
  try {
    // Obtenemos el contexto del canvas del DOM
    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");

    // Renderizamos el Mandala usando los datos auditados
    renderMandala(ctx, finalPayload);

    console.log(`>> CANVAS: Render successful. Mode: ${geometryType}`);

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
        timestamp: Date.now()
      }
    };

  } catch (error) {
    console.error(">> CANVAS RENDER ERROR:", error);
    return { status: "ERROR", message: error.message };
  }
}

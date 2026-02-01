/**
 * CANVAS CONTROLLER
 * OMNI-CHALAMANDRA
 *
 * Responsibility:
 * - Receive FINAL payload approved by George
 * - Validate audit state
 * - Transform signals into render instructions
 * - Coordinate geometric + visual layers
 */

import { buildMandalaGeometry } from "./mandalaRenderer.js";
import { applyColinearityGuide } from "./colinearityGuide.js";
import { computeCrossRatioVisual } from "./crossRatio.js";

export function CanvasController(finalPayload) {
  console.log(">> CANVAS: Initializing render pipeline...");

  /* --------------------------------------------------
     1. SAFETY CHECK — GEORGE AUTHORITY
  -------------------------------------------------- */

  if (!finalPayload?.shadow_verdict) {
    throw new Error("Canvas blocked: Shadow verdict missing.");
  }

  if (finalPayload.shadow_verdict.panic_triggered === true) {
    console.warn(">> CANVAS: Panic triggered. Rendering aborted.");
    return {
      status: "ABORTED",
      reason: "Shadow auditor blocked execution"
    };
  }

  /* --------------------------------------------------
     2. EXTRACT CORE SIGNALS
  -------------------------------------------------- */

  const {
    input_analysis,
    output_signals,
    dominant_layer,
    chain_data
  } = finalPayload;

  const crossRatio = input_analysis.cross_ratio;
  const frequencyHz = output_signals.frequency_hz;
  const geometryType = output_signals.geometry;

  if (!crossRatio || !frequencyHz || !geometryType) {
    throw new Error("Canvas blocked: Missing core render signals.");
  }

  /* --------------------------------------------------
     3. GEOMETRIC PRE-PROCESSING
  -------------------------------------------------- */

  const visualCrossRatio = computeCrossRatioVisual(crossRatio);

  const colinearityData = applyColinearityGuide({
    crossRatio: visualCrossRatio,
    dominantLayer: dominant_layer
  });

  /* --------------------------------------------------
     4. MANDALA GEOMETRY BUILD
  -------------------------------------------------- */

  const mandala = buildMandalaGeometry({
    geometryType,
    frequencyHz,
    crossRatio: visualCrossRatio,
    colinearity: colinearityData
  });

  /* --------------------------------------------------
     5. FINAL CANVAS PAYLOAD
  -------------------------------------------------- */

  const canvasPayload = {
    status: "READY",
    render_mode: "REAL_TIME",

    visual_parameters: {
      geometry: geometryType,
      frequency_hz: frequencyHz,
      cross_ratio: visualCrossRatio,
      dominant_layer: dominant_layer
    },

    mandala,
    colinearity: colinearityData,

    metadata: {
      chain_hash: chain_data.integrity_hash,
      timestamp: chain_data.timestamp
    }
  };

  console.log(">> CANVAS: Render payload ready.");
  return canvasPayload;
}

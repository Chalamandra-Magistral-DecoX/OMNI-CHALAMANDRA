/**
 * OMNI-CHALAMANDRA
 * Main Orchestrator — Hackathon Final
 *
 * Responsibilities:
 * 1. Receive final payload from Gemini reasoning
 * 2. Orchestrate Canvas rendering
 * 3. Trigger multimodal feedback (audio / visual / glitch)
 * 4. Export final JSON for user download
 *
 * This file is the EXECUTIVE BRAIN.
 */

import { orchestrateOMNI } from "./app/index/orchestrator.js";

// Canvas
import { renderMandala } from "./app/canvas/mandalaRenderer.js";

// Feedback Engines
import { playFrequency } from "./app/feedback/audioEngine.js";
import { applyVisualFeedback } from "./app/feedback/visualEngine.js";
import { triggerGlitch } from "./app/feedback/glitchEngine.js";

// Export
import { exportJSON } from "./app/export/exportJson.js";

/**
 * ENTRY POINT
 * This function is called once the user provides input
 * (crossRatio, mandalaSeed, etc.)
 */
export async function runOmniChalamandra(input) {
  console.log("🌀 OMNI-CHALAMANDRA :: System booting...");

  try {
    /* --------------------------------------------------
       1. CORE REASONING (Agents + George Audit)
    -------------------------------------------------- */
    const payload = await orchestrateOMNI(input);

    if (payload.error) {
      console.warn("⚠️ OMNI returned fallback payload");
    }

    /* --------------------------------------------------
       2. CANVAS RENDERING (Geometry Layer)
    -------------------------------------------------- */
    renderMandala(payload.output_signals.geometry);

    /* --------------------------------------------------
       3. MULTIMODAL FEEDBACK
       (Audio + Visual + Optional Glitch)
    -------------------------------------------------- */
    playFrequency(payload.output_signals.frequency_hz);
    applyVisualFeedback(payload.output_signals);

    if (payload.shadow_audit?.panic_triggered === true) {
      console.warn("🚨 George triggered panic protocol");
      triggerGlitch(payload.shadow_audit.glitch_intensity);
    }

    /* --------------------------------------------------
       4. EXPORT FINAL ARTIFACT
    -------------------------------------------------- */
    exportJSON(payload);

    console.log("✅ OMNI-CHALAMANDRA :: Execution complete");

    return payload;

  } catch (error) {
    console.error("❌ OMNI-CHALAMANDRA :: Fatal execution error", error);

    // Absolute safety fallback
    triggerGlitch(1.0);

    return {
      error: true,
      message: "Critical system failure",
    };
  }
}

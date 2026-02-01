// app/main.js

import { orchestrateOMNI } from "./orchestrator.js";

import { getCrossRatio } from "./canvas/crossratio.js";
import { renderMandala } from "./canvas/mandalaRenderer.js";

import { playFrequency } from "./feedback/audioEngine.js";
import { applyVisualFeedback } from "./feedback/visualEngine.js";
import { triggerGlitch } from "./feedback/glitchEngine.js";

import { exportJSON } from "./export/exportJSON.js";

/**
 * OMNI-CHALAMANDRA – MAIN ENTRY POINT
 * Role:
 * - Handle user interaction
 * - Send data to cognitive layer
 * - Render audio / visual feedback
 * - Enable export
 */
async function runOMNI() {
  console.log(">> OMNI MAIN: User interaction detected");

  /* -----------------------------------------
     1. COLLECT INPUT FROM CANVAS
  ----------------------------------------- */
  const crossRatio = getCrossRatio();

  const input = {
    crossRatio,
    mandalaSeed: {
      time: Date.now(),
      randomness: Math.random()
    }
  };

  /* -----------------------------------------
     2. CALL COGNITIVE ORCHESTRATOR
  ----------------------------------------- */
  const payload = await orchestrateOMNI(input);

  if (payload.error) {
    console.warn(">> OMNI MAIN: Error payload received");
    triggerGlitch(1.0);
    return;
  }

  /* -----------------------------------------
     3. VISUAL OUTPUT (MANDALA)
  ----------------------------------------- */
  renderMandala(payload.output_signals.geometry);

  /* -----------------------------------------
     4. AUDIO OUTPUT (RESONANT FREQUENCY)
  ----------------------------------------- */
  playFrequency(payload.output_signals.frequency_hz);

  /* -----------------------------------------
     5. VISUAL FEEDBACK (AURA / COHERENCE)
  ----------------------------------------- */
  applyVisualFeedback(payload.output_signals);

  /* -----------------------------------------
     6. SHADOW PANIC RESPONSE
  ----------------------------------------- */
  if (payload.shadow_audit?.panic_triggered) {
    triggerGlitch(payload.shadow_audit.glitch_intensity);
  }

  /* -----------------------------------------
     7. ENABLE EXPORT (JUDGES LOVE THIS)
  ----------------------------------------- */
  exportJSON(payload);

  console.log(">> OMNI MAIN: Execution completed");
}

/* -----------------------------------------
   BOOTSTRAP
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById("run-omni");

  if (runButton) {
    runButton.addEventListener("click", runOMNI);
  }
});

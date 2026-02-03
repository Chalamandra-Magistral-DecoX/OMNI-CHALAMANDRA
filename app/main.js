// app/main.js
// FIXED PATH: Pointing to the subfolder
import { orchestrateOMNI } from "./orchestrator/orchestrator.js";

import { getCrossRatio } from "./canvas/crossratio.js";
import { renderMandala } from "./canvas/mandalaRenderer.js";
import { playFrequency } from "./feedback/audioEngine.js";
import { applyVisualFeedback } from "./feedback/visualEngine.js";
import { triggerGlitch } from "./feedback/glitchEngine.js";
import { exportJSON } from "./export/exportJSON.js";

async function runOMNI() {
  console.log(">> OMNI MAIN: User interaction detected");

  const input = {
    crossRatio: getCrossRatio(),
    mandalaSeed: {
      time: Date.now(),
      randomness: Math.random()
    }
  };

  const payload = await orchestrateOMNI(input);

  if (payload.error) {
    console.error(">> OMNI MAIN: Execution halted");
    triggerGlitch(1.0);
    return;
  }

  renderMandala(payload.output_signals.geometry);
  playFrequency(payload.output_signals.frequency_hz);
  applyVisualFeedback(payload.output_signals);

  if (payload.shadow_audit?.panic_triggered) {
    triggerGlitch(payload.shadow_audit.glitch_intensity || 0.5);
  }

  exportJSON(payload);
}

document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById("run-omni");
  if (runButton) runButton.addEventListener("click", runOMNI);
});

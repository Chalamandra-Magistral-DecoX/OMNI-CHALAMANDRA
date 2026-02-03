// app/main.js
import { orchestrateOMNI } from "./orchestrator.js";
import { getCrossRatio } from "./canvas/crossratio.js";
import { renderMandala } from "./canvas/mandalaRenderer.js";
import { playFrequency } from "./feedback/audioEngine.js";
import { applyVisualFeedback } from "./feedback/visualEngine.js";
import { triggerGlitch } from "./feedback/glitchEngine.js";
import { exportJSON } from "./export/exportJSON.js";

async function runOMNI() {
  console.log(">> OMNI MAIN: User interaction detected");

  // 1. Collect perceptual data
  const input = {
    crossRatio: getCrossRatio(),
    mandalaSeed: {
      time: Date.now(),
      randomness: Math.random()
    }
  };

  // 2. Request reasoning from cognitive layer
  const payload = await orchestrateOMNI(input);

  if (payload.error) {
    console.error(">> OMNI MAIN: Execution halted due to orchestrator error");
    triggerGlitch(1.0);
    return;
  }

  // 3. Execution of multimodal outputs
  renderMandala(payload.output_signals.geometry);
  playFrequency(payload.output_signals.frequency_hz);
  applyVisualFeedback(payload.output_signals);

  // 4. Audit-driven glitch response
  if (payload.shadow_audit?.panic_triggered) {
    triggerGlitch(payload.shadow_audit.glitch_intensity || 0.5);
  }

  // 5. Final Export
  exportJSON(payload);
}

document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById("run-omni");
  if (runButton) runButton.addEventListener("click", runOMNI);
});

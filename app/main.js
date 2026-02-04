import { orchestrateOMNI } from "./orchestrator/flow.js";
import { CanvasController } from "./canvas/canvasController.js";
import { playFrequency } from "./feedback/audioEngine.js";
import { triggerGlitch } from "./feedback/glitchEngine.js";
import { updateUITheme } from "./feedback/visualEngine.js";
import { downloadJSON } from "./utils/exportJSON.js";

let points = [];
const canvas = document.getElementById("main-canvas");

// User interaction: Capture 4 points
canvas.addEventListener("click", async (e) => {
  if (points.length < 4) {
    const rect = canvas.getBoundingClientRect();
    points.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Feedback visual inmediato
    drawPoint(e.clientX - rect.left, e.clientY - rect.top);

    if (points.length === 4) {
      await runFullPipeline();
    }
  }
});

async function runFullPipeline() {
  try {
    const finalPayload = await orchestrateOMNI(points);
    
    // 1. Update UI & Shaders
    updateUITheme(finalPayload.george_verdict.status);
    
    // 2. Audio Resonance
    playFrequency(finalPayload.debate.output_signals.frequency_hz);

    // 3. Render Mandala via Controller
    CanvasController(finalPayload);

    // 4. Panic Check
    if (finalPayload.george_verdict.panic_triggered) {
      triggerGlitch(finalPayload.george_verdict.glitch_intensity);
    }

    // 5. Automatic Export (Optional)
    console.log(">> SYSTEM: Analysis complete. Exporting JSON...");
    downloadJSON(finalPayload);

    points = []; // Reset for next cycle
  } catch (error) {
    console.error(">> FATAL ERROR:", error);
    triggerGlitch(1.0);
  }
}

function drawPoint(x, y) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#00f3ff";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

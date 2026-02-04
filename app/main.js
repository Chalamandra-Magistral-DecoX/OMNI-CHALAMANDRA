import { orchestrateOMNI } from "./orchestrator/flow.js";
import { CanvasController } from "./canvas/canvasController.js";
import { playFrequency } from "./feedback/audioEngine.js";
import { triggerGlitch } from "./feedback/glitchEngine.js";
import { updateUITheme } from "./feedback/visualEngine.js";
import { exportResultJSON } from "./utils/exportJSON.js";

let points = [];
const canvas = document.getElementById("main-canvas");

canvas.addEventListener("click", async (e) => {
  if (points.length < 4) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    points.push({ x, y });
    
    drawPoint(x, y);

    if (points.length === 4) {
      document.getElementById("status-indicator").innerText = "PROCESSING GEOMETRY...";
      await runAnalysis();
    }
  }
});

async function runAnalysis() {
  try {
    const finalPayload = await orchestrateOMNI(points);
    
    // 1. Feedback Sensorial
    updateUITheme(finalPayload.george_verdict.status);
    playFrequency(finalPayload.debate.output_signals.frequency_hz);
    
    // 2. Renderizado de Mandala
    CanvasController(finalPayload);

    // 3. Actualización de UI de Agentes
    updateAgentUI(finalPayload);

    // 4. Manejo de Pánico/Glitch
    if (finalPayload.george_verdict.panic_triggered) {
      triggerGlitch(finalPayload.george_verdict.glitch_intensity);
    }

    // 5. Exportación Automática de Auditoría
    exportResultJSON(finalPayload);

    // Reset
    points = [];
    document.getElementById("status-indicator").innerText = "SYSTEM STABILIZED // READY";
  } catch (error) {
    console.error(">> SYSTEM CRASH:", error);
    triggerGlitch(1.0);
    document.getElementById("status-indicator").innerText = "SYSTEM ERROR";
  }
}

function updateAgentUI(payload) {
  document.querySelector("#card-scientist .content p").innerText = payload.debate.agent_insights.scientist;
  document.querySelector("#card-philosopher .content p").innerText = payload.debate.agent_insights.philosopher;
  document.getElementById("george-verdict").innerText = payload.george_verdict.final_verdict;
  document.getElementById("val-ratio").innerText = payload.crossRatio.toFixed(6);
  document.getElementById("val-freq").innerText = ${payload.debate.output_signals.frequency_hz}Hz;
  document.getElementById("val-hash").innerText = payload.chain_data.current_hash;
}

function drawPoint(x, y) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#00f3ff";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

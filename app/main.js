import { orchestrateOMNI } from "./orchestrator/OrchestratorFlow.js";
import { CanvasController } from "./canvas/CanvasController.js";
import { playFrequency } from "./feedback/audioEngine.js";
import { triggerGlitch } from "./feedback/glitchEngine.js";
import { updateUITheme } from "./feedback/visualEngine.js";
import { exportResultJSON } from "./utils/export.JSON.js";

let points = [];
const canvas = document.getElementById("main-canvas");
const statusIndicator = document.getElementById("status-indicator");

canvas.addEventListener("click", async (e) => {
  if (points.length < 4) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    points.push({ x, y });

    drawPoint(x, y);

    if (points.length === 4) {
      statusIndicator.innerText = "PROCESSING GEOMETRY // SYNCHRONIZING AGENTS...";
      await runAnalysis();
    }
  }
});

async function runAnalysis() {
  try {
    // 1. Execute Orchestrator
    const finalPayload = await orchestrateOMNI(points);

    // 2. Visual Theme & Audio Resonance
    updateUITheme(finalPayload.debate.output_signals.geometry);
    playFrequency(finalPayload.debate.output_signals.frequency_hz);

    // 3. Render Mandala
    CanvasController(finalPayload);

    // 4. Update UI Insights (DOM)
    updateAgentUI(finalPayload);

    // 5. Security & Stability Check (GEORGE)
    if (finalPayload.george_verdict.panic_triggered) {
      triggerGlitch(finalPayload.george_verdict.glitch_intensity);
      statusIndicator.innerText = "SYSTEM INSTABILITY DETECTED // AUDIT ACTIVE";
    } else {
      statusIndicator.innerText = "SYSTEM STABILIZED // DATA SECURED";
    }

    // 6. Generate Exportable Audit Trail
    exportResultJSON(finalPayload);

    // Reset capture
    points = [];

  } catch (error) {
    console.error(">> SYSTEM CRASH:", error);
    triggerGlitch(1.0);
    statusIndicator.innerText = "CRITICAL FAILURE // CORE DUMPED";
  }
}

function updateAgentUI(payload) {
  // Update Agent Cards
  document.querySelector("#card-scientist .content p").innerText = payload.debate.agent_insights.scientist;
  document.querySelector("#card-philosopher .content p").innerText = payload.debate.agent_insights.philosopher;

  // Update George Audit Info
  const georgeP = document.getElementById("george-verdict");
  georgeP.innerText = payload.george_verdict.final_verdict;
  georgeP.style.color = payload.george_verdict.panic_triggered ? "#ff4400" : "#00ffaa";

  // Update Footer Data
  document.getElementById("val-ratio").innerText = payload.input_analysis.cross_ratio.toFixed(6);
  document.getElementById("val-freq").innerText = `${payload.debate.output_signals.frequency_hz}Hz`;
  document.getElementById("val-hash").innerText = payload.chain_data.current_hash;
}

function drawPoint(x, y) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#00f3ff";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#00f3ff";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

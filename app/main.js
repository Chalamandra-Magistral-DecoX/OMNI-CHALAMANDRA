/**
 * OMNI-CHALAMANDRA — MAIN ENTRY POINT
 * Connects UI Events to Orchestration and Execution
 */

import { initCanvas, drawCircle, clearCanvas } from "./canvas/controller.js";
import { calculateCrossRatio } from "./canvas/crossRatio.js";
import { orchestrateOMNI } from "./orchestrator/flow.js"; // Cambiado para coincidir con tu flow.js
import { renderMandala } from "./canvas/renderer.js";    // Separación de responsabilidades
import { triggerFeedback } from "./feedback/visual.js"; // Para el Glitch/Feedback

// Global State
const state = {
  points: [],
  isProcessing: false
};

// Initialize Canvas
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("click", async (e) => {
  if (state.isProcessing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  state.points.push({ x, y });
  drawPoint(x, y);

  // OMNI-CHALAMANDRA triggers when 4 points are set
  if (state.points.length === 4) {
    await runOmniSequence();
  }
});

async function runOmniSequence() {
  state.isProcessing = true;
  updateStatus("ORCHESTRATING DEBATE...");

  try {
    // 1. Math Invariant (Deterministic Layer)
    const R = calculateCrossRatio(state.points);

    // 2. Core Orchestration (Math -> Gemini -> GEORGE Audit)
    const finalPayload = await orchestrateOMNI({
      crossRatio: R,
      mandalaSeed: { points: state.points, timestamp: Date.now() }
    });

    // 3. Execution Layer (Visual & Audio Feedback)
    // El Main solo ejecuta, no piensa.
    renderMandala(ctx, finalPayload);
    triggerFeedback(finalPayload);    // Activa Glitch si George lo indica

    // Update UI with GEORGE's Verdict
    updateStatus("VERDICT: " + finalPayload.george_verdict.status);
    
    // Reset for next interaction after a delay
    setTimeout(() => {
        state.points = [];
        clearCanvas(ctx);
        updateStatus("SYSTEM READY");
    }, 5000);
    
  } catch (error) {
    console.error("OMNI CRITICAL ERROR:", error);
    updateStatus("SYSTEM PANIC: AUDIT FAILED");
    document.body.classList.add("glitch-active"); // Forzado de emergencia
  } finally {
    state.isProcessing = false;
  }
}

function drawPoint(x, y) {
  ctx.fillStyle = "#00f3ff";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#00f3ff";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
}

function updateStatus(msg) {
  const statusEl = document.getElementById("status-bar"); // Sincronizado con tu index.html
  if (statusEl) statusEl.innerText = "STATUS: " + msg;
  
  const georgeEl = document.getElementById("george-status");
  if (georgeEl) georgeEl.innerText = msg.includes("PANIC") ? "CRITICAL" : "ACTIVE";
}
Escribe en Dana de Brasdefer

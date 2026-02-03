/**
 * OMNI-CHALAMANDRA — MAIN ENTRY POINT
 * Connects UI Events to Orchestration and Rendering
 */

import { CanvasController as ControllerUI } from "./canvas/controller.js";
import { calculateCrossRatio } from "./canvas/crossRatio.js";
import { orchestrateOMNI } from "./orchestrator/orchestrator.js";
import { CanvasController as RenderUI } from "./canvas/controller.js";

// Global State
const state = {
  points: [],
  isProcessing: false
};

// Initialize Canvas interaction
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
    // 1. Math Invariant
    const R = calculateCrossRatio(state.points);

    // 2. Core Orchestration (Math -> Gemini -> GEORGE)
    const finalPayload = await orchestrateOMNI({
      crossRatio: R,
      mandalaSeed: { points: state.points, timestamp: Date.now() }
    });

    // 3. Render Execution
    // Pass the payload back to the Canvas Controller for drawing
    RenderUI(finalPayload);

    updateStatus("VERDICT: " + finalPayload.shadow_audit.final_verdict);
    state.points = []; // Reset for next interaction
    
  } catch (error) {
    console.error("OMNI CRITICAL ERROR:", error);
    updateStatus("SYSTEM GLITCH: Check Console");
  } finally {
    state.isProcessing = false;
  }
}

function drawPoint(x, y) {
  ctx.fillStyle = "#00f3ff";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

function updateStatus(msg) {
  const statusEl = document.getElementById("status-display");
  if (statusEl) statusEl.innerText = msg;
  console.log(">> OMNI STATUS:", msg);
}

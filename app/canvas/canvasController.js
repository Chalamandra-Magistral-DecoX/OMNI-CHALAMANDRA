/**
 * CANVAS CONTROLLER
 * Translates OMNI-CHALAMANDRA JSON output into visual reality.
 */

import { drawMandala } from "./mandalaRenderer.js";
import { playFrequency } from "../feedback/audioEngine.js";

let canvas, ctx;
let lastState = null;

export function initCanvas() {
  canvas = document.querySelector("canvas");
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * Main render entry point
 */
export function renderState(state) {
  if (!ctx) initCanvas();

  lastState = state;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMandala(ctx, canvas, state);
  playFrequency(state.frecuencia_hz, state.indice_coordinacion);
}

/**
 * Re-render last known valid state
 * Used after glitch / panic recovery
 */
export function rerender() {
  if (lastState) {
    renderState(lastState);
  }
}

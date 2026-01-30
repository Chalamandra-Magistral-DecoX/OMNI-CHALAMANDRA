import { calculateCrossRatio } from "./crossratio.js";
import { drawColinearityGuide } from "./colinearityguide.js";
import { renderMandala } from "./mandalaRenderer.js";
import { orchestrateOMNI } from "../agents/orchestrator.js";
import { triggerPanic } from "../feedback/glitchEngine.js";

/**
 * CANVAS CONTROLLER
 * Connects human input → math → AI → geometry → feedback
 */

const canvas = document.getElementById("canvasMain");
const ctx = canvas.getContext("2d");

let image = null;
let points = [];
let isLocked = false;

/* ------------------------------------
   IMAGE LOAD (SRAP INPUT)
------------------------------------ */

export function loadImageToCanvas(file) {
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    image = img;
    points = [];
    isLocked = false;
    draw();
  };
  img.src = URL.createObjectURL(file);
}

/* ------------------------------------
   CLICK HANDLING (POINT SELECTION)
------------------------------------ */

canvas.addEventListener("click", async (e) => {
  if (!image || isLocked) return;
  if (points.length >= 4) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  points.push([x, y]);
  draw();

  if (points.length === 4) {
    isLocked = true;
    await transmuteChaos();
  }
});

/* ------------------------------------
   DRAW LOOP
------------------------------------ */

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (image) {
    ctx.drawImage(image, 0, 0);
  }

  // Draw selected points
  points.forEach(([x, y], i) => {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD54F";
    ctx.fill();
    ctx.fillText(i + 1, x + 8, y - 8);
  });

  // Draw colinearity guide
  if (points.length >= 2) {
    drawColinearityGuide(ctx, points);
  }
}

/* ------------------------------------
   CORE TRANSMUTATION PIPELINE
------------------------------------ */

async function transmuteChaos() {
  try {
    const R = calculateCrossRatio(points);

    console.log(">> CROSS RATIO:", R);

    const input = {
      crossRatio: R,
      mandalaSeed: points,
      imageContext: image ? image.src : null
    };

    const payload = await orchestrateOMNI(input);

    if (payload.error) {
      console.warn("Payload error:", payload.message);
      triggerPanic();
      return;
    }

    // Clear canvas for visualization
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render mandala (DECOX → VISUAL)
    renderMandala(
      ctx,
      canvas.width / 2,
      canvas.height / 2,
      payload
    );

    // Optional: overlay debug
    debugOverlay(R, payload);

  } catch (err) {
    console.error(">> TRANSMUTATION ERROR:", err);
    triggerPanic();
  }
}

/* ------------------------------------
   DEBUG OVERLAY (FOR JUDGES 😎)
------------------------------------ */

function debugOverlay(R, payload) {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(10, 10, 320, 120);

  ctx.fillStyle = "#00E5FF";
  ctx.font = "12px monospace";
  ctx.fillText(R (Invariant): ${R.toFixed(4)}, 20, 30);
  ctx.fillText(Freq: ${payload.frecuencia_hz} Hz, 20, 50);
  ctx.fillText(Geometry: ${payload.geometria_sugerida}, 20, 70);
  ctx.fillText(Coordination: ${payload.indice_coordinacion}, 20, 90);
  ctx.restore();
}

/* ------------------------------------
   RESET (Manual or Panic)
------------------------------------ */

export function resetCanvas() {
  points = [];
  isLocked = false;
  draw();
}

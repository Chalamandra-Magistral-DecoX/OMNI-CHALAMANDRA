/**
 * GLITCH ENGINE — OMNI-CHALAMANDRA
 * PANIC MODE
 * This engine is triggered ONLY by George (Shadow Auditor).
 * It represents systemic failure or hallucination.
 */

let glitchActive = false;

export function triggerPanic(intensity = 1.0) {
  if (glitchActive) return;
  glitchActive = true;

  const body = document.body;
  const level = Math.max(0.2, Math.min(1, intensity));

  body.classList.add("omni-glitch");

  body.style.setProperty("--glitch-intensity", level.toString());

  // Auto-recovery after short time (system resilience)
  setTimeout(() => {
    stopPanic();
  }, 1800);
}

export function stopPanic() {
  const body = document.body;
  body.classList.remove("omni-glitch");
  body.style.removeProperty("--glitch-intensity");
  glitchActive = false;
}

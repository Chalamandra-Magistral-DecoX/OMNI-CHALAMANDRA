/**
 * GLITCH ENGINE
 * Visual feedback system for systemic anomalies.
 * Triggered by JORGE or orchestrator failure.
 */

let glitchActive = false;

export function triggerPanic() {
  if (glitchActive) return;

  glitchActive = true;
  console.warn(">> GLITCH ENGINE: PANIC MODE ACTIVATED");

  const canvas = document.querySelector("canvas");
  if (!canvas) {
    console.warn(">> GLITCH ENGINE: No canvas found");
    return;
  }

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  let frames = 0;

  const glitchInterval = setInterval(() => {
    frames++;

    // Random horizontal slices
    for (let i = 0; i < 12; i++) {
      const y = Math.random() * height;
      const sliceHeight = Math.random() * 15;
      const offset = (Math.random() - 0.5) * 60;

      ctx.drawImage(
        canvas,
        0,
        y,
        width,
        sliceHeight,
        offset,
        y,
        width,
        sliceHeight
      );
    }

    // Noise overlay
    ctx.fillStyle = rgba(255,255,255,${Math.random() * 0.1});
    ctx.fillRect(0, 0, width, height);

    // Stop after short burst
    if (frames > 25) {
      clearInterval(glitchInterval);
      glitchActive = false;
      console.warn(">> GLITCH ENGINE: Panic resolved");
    }
  }, 40);
}

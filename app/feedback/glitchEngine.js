/**
 * GLITCH ENGINE — OMNI-CHALAMANDRA
 * Responsibility: Visual manifestation of GEORGE's audit intensity.
 */

/**
 * Triggers visual instability when GEORGE detects high drift or panic.
 * @param {number} intensity - Severity from 0 to 1.0.
 */
export function triggerGlitch(intensity = 0.5) {
  const canvas = document.getElementById("main-canvas");
  const body = document.body;

  console.log(`>> GLITCH: Instability detected. Severity: ${intensity}`);

  // Apply CSS classes and variables for the glitch shaders
  body.classList.add("glitch-active");
  body.style.setProperty("--glitch-intensity", `${intensity * 20}px`);

  // Shake effect for high-severity hallucinations (GEORGE panic mode)
  if (intensity > 0.7) {
    applyShake(canvas, intensity);
  }

  // Chromatic emergency state (Total System Inversion)
  if (intensity > 0.85) {
    body.style.filter = `invert(1) hue-rotate(${intensity * 360}deg)`;
  }

  // Cleanup and stabilization sequence
  setTimeout(() => {
    body.classList.remove("glitch-active");
    body.style.filter = "";
    if (canvas) canvas.style.transform = "";
    console.log(">> GLITCH: System normalized and stabilized.");
  }, 2000 * intensity);
}

/**
 * Applies a physical shake to the UI elements.
 */
function applyShake(element, intensity) {
  if (!element) return;
  const shakeInterval = setInterval(() => {
    const x = (Math.random() - 0.5) * intensity * 25;
    const y = (Math.random() - 0.5) * intensity * 25;
    element.style.transform = `translate(${x}px, ${y}px)`;
  }, 50);

  setTimeout(() => clearInterval(shakeInterval), 800);
}

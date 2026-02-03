/**
 * GLITCH ENGINE — OMNI-CHALAMANDRA
 * Responsibility: Visual manifestation of GEORGE's audit intensity.
 */

export function triggerGlitch(intensity = 0.5) {
  const canvas = document.getElementById("main-canvas");
  const body = document.body;

  console.log(>> GLITCH: Instability detected. Severity: ${intensity});

  // Apply CSS filters based on intensity
  body.classList.add("glitch-active");
  body.style.setProperty("--glitch-intensity", ${intensity * 20}px);

  // Shake effect for high-severity hallucinations
  if (intensity > 0.7) {
    applyShake(canvas, intensity);
  }

  // Chromatic emergency state
  if (intensity > 0.85) {
    body.style.filter = invert(1) hue-rotate(${intensity * 360}deg);
  }

  // Cleanup and stabilization
  setTimeout(() => {
    body.classList.remove("glitch-active");
    body.style.filter = "";
    if (canvas) canvas.style.transform = "";
    console.log(">> GLITCH: System normalized.");
  }, 1500 * intensity);
}

function applyShake(element, intensity) {
  if (!element) return;
  const shakeInterval = setInterval(() => {
    const x = (Math.random() - 0.5) * intensity * 20;
    const y = (Math.random() - 0.5) * intensity * 20;
    element.style.transform = translate(${x}px, ${y}px);
  }, 50);
  
  setTimeout(() => clearInterval(shakeInterval), 500);
}

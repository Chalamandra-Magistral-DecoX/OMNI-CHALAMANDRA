// app/feedback/glitchEngine.js

export function triggerGlitch(intensity = 0.5) {
  const body = document.body;

  body.classList.add("glitch-active");

  body.style.setProperty(
    "--glitch-intensity",
    intensity
  );

  setTimeout(() => {
    body.classList.remove("glitch-active");
  }, 1200);
}

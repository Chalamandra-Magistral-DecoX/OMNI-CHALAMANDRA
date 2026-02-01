// app/feedback/visualEngine.js

export function applyVisualFeedback({
  stabilityScore,
  geometryCategory
}) {
  const root = document.documentElement;

  // Stability affects saturation
  const saturation = Math.max(
    30,
    Math.min(100, stabilityScore * 100)
  );

  root.style.setProperty(
    "--omni-saturation",
    ${saturation}%
  );

  // Geometry affects hue
  const hueMap = {
    HARMONIC: 180,
    STABLE: 120,
    COMPRESSED: 40,
    EXPANSIVE: 280,
    CHAOTIC: 0
  };

  const hue = hueMap[geometryCategory] || 200;

  root.style.setProperty(
    "--omni-hue",
    hue
  );
}

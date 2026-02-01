/**
 * VISUAL ENGINE — OMNI-CHALAMANDRA
 * Purpose:
 * - Control visual feedback layer (auras, states, system mood)
 * - Responds to dominant layer + coordination index
 */

export function updateVisualState({
  dominantLayer,
  coordinationIndex,
  geometry
}) {
  const root = document.documentElement;

  /* Coordination affects saturation */
  const saturation = Math.min(100, Math.max(20, coordinationIndex * 100));
  root.style.setProperty("--system-saturation", ${saturation}%);

  /* Geometry hint (used by canvas renderer) */
  root.setAttribute("data-geometry", geometry || "UNKNOWN");

  /* Dominant cognitive layer coloring */
  switch (dominantLayer) {
    case "NEURO":
      root.style.setProperty("--system-hue", "200");
      break;
    case "NARRATIVE":
      root.style.setProperty("--system-hue", "40");
      break;
    case "HEALING":
      root.style.setProperty("--system-hue", "120");
      break;
    case "TECHNO":
      root.style.setProperty("--system-hue", "280");
      break;
    case "PROTOCOL":
      root.style.setProperty("--system-hue", "0");
      break;
    default:
      root.style.setProperty("--system-hue", "180");
  }
}

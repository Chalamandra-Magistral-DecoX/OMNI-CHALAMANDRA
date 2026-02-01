/**
 * VISUAL ENGINE — OMNI-CHALAMANDRA
 * Handles non-destructive visual feedback:
 * aura, color shifts, coherence state.
 */

export function applyVisualState({
  dominantLayer,
  coordinationIndex,
  geometry
}) {
  const root = document.documentElement;

  // Normalize coordination (0–1)
  const intensity = Math.max(0, Math.min(1, coordinationIndex || 0));

  // Color mapping by layer
  const layerColors = {
    NEURO: "#4cc9f0",
    NARRATIVE: "#f72585",
    HEALING: "#80ffdb",
    TECHNO: "#ffd166",
    PROTOCOL: "#cdb4db"
  };

  const color = layerColors[dominantLayer] || "#ffffff";

  root.style.setProperty("--omni-accent-color", color);
  root.style.setProperty("--omni-coherence", intensity.toString());

  // Geometry hint (used by canvas renderer if needed)
  root.dataset.omniGeometry = geometry || "UNKNOWN";

  // Subtle glow proportional to coordination
  root.style.setProperty(
    "--omni-glow-strength",
    ${Math.floor(intensity * 20)}px
  );
}

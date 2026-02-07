/**
 * OMNI-CHALAMANDRA — VISUAL ENGINE
 * Lead Developer: Dana Michelle Vargas
 * Brasdefer — Chalamandra Magistral
 * Project Initiative: DecoX
 *
 * Responsibility: Ambient UI updates and peripheral visual feedback.
 */

/**
 * Synchronizes the entire UI theme based on the detected geometric category.
 * @param {string} category - The geometric class calculated by the Invariant Engine.
 */
export function updateUITheme(category) {
  const root = document.documentElement;

  // Color palettes mapped to mathematical archetypes
  const themes = {
    HARMONIC_GOLDEN: { color: "#00f3ff", glow: "rgba(0, 243, 255, 0.5)" }, // Cyan stable
    DISRUPTIVE_EXPANSION: { color: "#ff00ff", glow: "rgba(255, 0, 255, 0.5)" }, // Magenta energetic
    STANDARD: { color: "#00ffaa", glow: "rgba(0, 255, 170, 0.5)" }, // Green balanced
    DEGENERATE_LINEAR: { color: "#ffff00", glow: "rgba(255, 255, 0, 0.5)" }, // Yellow warning
    PARADIGM_INVERSION: { color: "#ff4400", glow: "rgba(255, 68, 0, 0.5)" }  // Red chaotic
  };

  // Fallback to STANDARD if the category is unknown
  const theme = themes[category] || themes.STANDARD;

  // Inject CSS Variables for real-time styling
  root.style.setProperty("--accent-color", theme.color);
  root.style.setProperty("--glow-color", theme.glow);

  // Add a smooth transition effect to the body
  document.body.style.transition = "background-color 1.5s ease, color 1.5s ease";

  console.log(`>> VISUAL: UI Theme synchronized to ${category}`);
}

/**
 * VISUAL ENGINE — OMNI-CHALAMANDRA
 * Responsibility: Ambient UI updates and peripheral visual feedback.
 */

export function updateUITheme(category) {
  const root = document.documentElement;
  
  const themes = {
    HEXAGON: { color: "#00f3ff", glow: "rgba(0, 243, 255, 0.5)" },
    PENTAGON: { color: "#ff00ff", glow: "rgba(255, 0, 255, 0.5)" },
    SPIRAL: { color: "#00ffaa", glow: "rgba(0, 255, 170, 0.5)" },
    TETRAHEDRON: { color: "#ffff00", glow: "rgba(255, 255, 0, 0.5)" },
    CHAOTIC: { color: "#ff4400", glow: "rgba(255, 68, 0, 0.5)" }
  };

  const theme = themes[category] || themes.SPIRAL;
  
  root.style.setProperty("--accent-color", theme.color);
  root.style.setProperty("--glow-color", theme.glow);
  
  console.log(>> VISUAL: UI Theme synchronized to ${category});
}

/**
 * OMNI-CHALAMANDRA — INVARIANT CONFIG
 * All math is deterministic and computed outside the model.
 * Gemini receives values as facts, not tasks.
 */

export const INVARIANTS = {
  GOLDEN_RATIO: 1.61803398875,

  FREQUENCY_BASE: 432,
  FREQUENCY_RANGE: 96, // 432 → 528 Hz

  STABILITY_RANGE: {
    MIN: 0.0,
    MAX: 1.0
  },

  COORDINATION_RANGE: {
    MIN: 0.0,
    MAX: 1.0
  }
};

/**
 * Compute invariant signals from cross-ratio R
 * This function is the ONLY place where math happens.
 */
export function computeInvariantSignals(crossRatio) {
  const R = Number(crossRatio);

  // Frequency mapping (bounded)
  const frequencyHz =
    INVARIANTS.FREQUENCY_BASE +
    ((Math.abs(R) % INVARIANTS.GOLDEN_RATIO) * INVARIANTS.FREQUENCY_RANGE);

  // Coordination index (distance from golden ratio)
  const coordinationIndex = Math.max(
    0,
    1 - Math.abs(R - INVARIANTS.GOLDEN_RATIO) / 2
  );

  // Stability score
  const stabilityScore =
    R > 0 && R < 3
      ? Math.max(0, 1 - Math.abs(R - 1) / 2)
      : 0;

  // Geometry classification
  let geometryCategory = "CHAOTIC";

  if (R > 1.55 && R < 1.7) geometryCategory = "HEXAGON";
  else if (R > 1.2 && R <= 1.55) geometryCategory = "PENTAGON";
  else if (R > 0.8 && R <= 1.2) geometryCategory = "SPIRAL";
  else if (R <= 0.8) geometryCategory = "TETRAHEDRON";

  return {
    frequencyHz: Number(frequencyHz.toFixed(2)),
    coordinationIndex: Number(coordinationIndex.toFixed(3)),
    stabilityScore: Number(stabilityScore.toFixed(3)),
    geometryCategory
  };
}

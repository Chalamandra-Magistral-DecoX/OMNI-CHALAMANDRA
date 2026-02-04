/**
 * OMNI-CHALAMANDRA — INVARIANT ENGINE
 * Computes deterministic signals from the Cross-Ratio
 */

export function computeInvariantSignals(R) {
  // 1. Frequency Mapping (Resonant Audio Signal)
  // Maps R to a frequency range between 200Hz and 800Hz
  const frequency = Math.min(Math.max(200 + (R * 100), 200), 800);

  // 2. Coordination Index (System Stability)
  // A value of 1.0 is the Golden Ratio (Harmonic)
  const phi = 1.61803398875;
  const coordination = 1 - Math.min(Math.abs(R - phi) / phi, 1);

  // 3. Geometry Category Definition
  let category = "STANDARD";
  if (R === 1) category = "DEGENERATE_LINEAR";
  if (Math.abs(R - phi) < 0.1) category = "HARMONIC_GOLDEN";
  if (R < 0) category = "PARADIGM_INVERSION";
  if (R > 2.0) category = "DISRUPTIVE_EXPANSION";

  return {
    frequency_hz: Math.round(frequency),
    coordination_index: parseFloat(coordination.toFixed(4)),
    geometry_category: category,
    stability_score: parseFloat((coordination * 100).toFixed(2))
  };
}

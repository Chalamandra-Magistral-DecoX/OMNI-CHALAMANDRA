/**
 * CROSS RATIO (R) — OMNI-CHALAMANDRA
 * Responsibility: Compute the anharmonic ratio as a stable geometric invariant.
 */

/**
 * Computes the cross ratio of four colinear points A, B, C, D
 * Formula: (AC / BC) / (AD / BD)
 */
export function computeCrossRatioVisual(A, B, C, D) {
  // Defensive check for the demo flow
  if (!A || !B || !C || !D) return 1.0;

  try {
    const AC = distance(A, C);
    const BC = distance(B, C);
    const AD = distance(A, D);
    const BD = distance(B, D);

    // Division by zero prevention for overlapping points
    if (BC === 0 || AD === 0 || BD === 0) {
      console.warn(">> MATH: Points too close, returning stable default (1.0)");
      return 1.0;
    }

    const ratio = (AC / BC) / (AD / BD);
    return Number(ratio.toFixed(6));
  } catch (e) {
    return 1.0;
  }
}

/**
 * Categorizes the ratio for downstream logic (Visual/Audio)
 */
export function categorizeCrossRatio(R) {
  if (R < 0) return "INVERSION";
  if (R < 0.618) return "COLLAPSE_RISK";
  if (R < 1.0) return "COMPRESSION";
  if (R < 1.618) return "STABLE_TENSION";
  if (R < 2.0) return "HARMONIC_EXPANSION";
  return "DISRUPTIVE_EXPANSION";
}

/* --------------------------------------------------
   INTERNAL HELPERS
-------------------------------------------------- */

function distance(p1, p2) {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
    Math.pow(p2.y - p1.y, 2)
  );
}

/**
 * CROSS RATIO MODULE — OMNI-CHALAMANDRA
 * Mathematical invariant used as perceptual fingerprint.
 * This value MUST remain stable under perspective change.
 */

/**
 * Check if four points are approximately colinear
 * using area of triangle method.
 */
export function areColinear(p1, p2, p3, tolerance = 0.0001) {
  const area =
    p1.x * (p2.y - p3.y) +
    p2.x * (p3.y - p1.y) +
    p3.x * (p1.y - p2.y);

  return Math.abs(area) < tolerance;
}

/**
 * Compute Cross Ratio (Anharmonic Ratio)
 * Given four colinear points A, B, C, D
 *
 * CR = (AC / BC) / (AD / BD)
 */
export function computeCrossRatio(A, B, C, D) {
  // Validate colinearity (critical for mathematical meaning)
  if (
    !areColinear(A, B, C) ||
    !areColinear(A, B, D)
  ) {
    throw new Error(
      "Cross Ratio undefined: points are not colinear"
    );
  }

  const dist = (p, q) =>
    Math.hypot(q.x - p.x, q.y - p.y);

  const AC = dist(A, C);
  const BC = dist(B, C);
  const AD = dist(A, D);
  const BD = dist(B, D);

  if (BC === 0 || BD === 0) {
    throw new Error(
      "Cross Ratio undefined: division by zero"
    );
  }

  const crossRatio = (AC / BC) / (AD / BD);

  return {
    value: crossRatio,
    invariant: true,
    interpretation: interpretCrossRatio(crossRatio)
  };
}

/**
 * Semantic interpretation used by the AI layer
 * (human-readable, not mathematical)
 */
function interpretCrossRatio(R) {
  if (R < 0) {
    return "Paradigm inversion detected";
  }

  if (Math.abs(R - 1.618) < 0.05) {
    return "Golden ratio proximity detected";
  }

  if (R < 1) {
    return "Perceptual compression";
  }

  if (R > 2) {
    return "Disruptive expansion";
  }

  return "Neutral coordination state";
}

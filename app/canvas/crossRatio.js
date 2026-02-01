//**
 * CROSS RATIO
 * OMNI-CHALAMANDRA
 *
 * Responsibility:
 * - Compute the anharmonic ratio (cross ratio)
 * - Provide a stable geometric invariant
 * - No AI, no narrative, no validation logic
 */

/**
 * Computes the cross ratio of four colinear points A, B, C, D
 * Formula:
 * (AC / BC) ÷ (AD / BD)
 */
export function computeCrossRatio(A, B, C, D) {
  validatePoints(A, B, C, D);

  const AC = distance(A, C);
  const BC = distance(B, C);
  const AD = distance(A, D);
  const BD = distance(B, D);

  if (BC === 0 || BD === 0) {
    throw new Error("Invalid configuration: division by zero in cross ratio");
  }

  const ratio = (AC / BC) / (AD / BD);
  return Number(ratio.toFixed(6));
}

/**
 * Optional helper:
 * Categorizes the ratio for downstream systems
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

function validatePoints(...points) {
  points.forEach((p, index) => {
    if (
      !p ||
      typeof p.x !== "number" ||
      typeof p.y !== "number"
    ) {
      throw new Error(Invalid point at index ${index});
    }
  });
}

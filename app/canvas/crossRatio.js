/**
 * CROSS RATIO (R) — OMNI-CHALAMANDRA
 * Responsibility: Compute the anharmonic ratio as a stable geometric invariant.
 */

/**
 * Computes the cross ratio of four colinear points A, B, C, D
 * Formula: (AC / BC) / (AD / BD)
 * @returns {number} The projective invariant R.
 */
export function calculateCrossRatio(points) {
  // Extract points from array structure for cleaner math
  if (!points || points.length < 4) return 1.0;
  
  const [A, B, C, D] = points;

  try {
    const AC = distance(A, C);
    const BC = distance(B, C);
    const AD = distance(A, D);
    const BD = distance(B, D);

    // Division by zero prevention for overlapping points (Singularity defense)
    if (BC === 0 || AD === 0 || BD === 0) {
      console.warn(">> MATH: Geometric singularity detected. Defaulting to 1.0");
      return 1.0;
    }

    const ratio = (AC / BC) / (AD / BD);
    
    // Log with high precision for the Shadow Auditor
    console.log(`>> MATH: Invariant R synthesized: ${ratio.toFixed(6)}`);
    return Number(ratio.toFixed(6));
  } catch (e) {
    console.error(">> MATH ERROR: Cross-ratio calculation failed.", e);
    return 1.0;
  }
}

/**
 * Categorizes the ratio for downstream logic (Visual/Audio/AI Persona)
 * Used by the Invariant Engine to signal the system state.
 */
export function categorizeCrossRatio(R) {
  if (R < 0) return "PARADIGM_INVERSION";
  if (R < 0.618) return "COLLAPSE_RISK";
  if (R < 1.0) return "STABLE_COMPRESSION";
  if (Math.abs(R - 1.618) < 0.1) return "HARMONIC_GOLDEN";
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

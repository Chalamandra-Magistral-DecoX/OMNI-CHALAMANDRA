/**
 * CROSS RATIO CALCULATOR
 * Computes the Anamorphic Ratio (Razón Anarmónica)
 * Invariant under projection → mathematical identity fingerprint
 */

export function computeCrossRatio(p1, p2, p3, p4) {
  // Distances along the line
  const d12 = distance(p1, p2);
  const d34 = distance(p3, p4);
  const d13 = distance(p1, p3);
  const d24 = distance(p2, p4);

  // Prevent division by zero
  if (d13 === 0 || d24 === 0) return null;

  const R = (d12 / d13) / (d34 / d24);
  return R;
}

function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

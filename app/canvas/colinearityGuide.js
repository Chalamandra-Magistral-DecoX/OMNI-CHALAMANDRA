/**
 * COLINEARITY GUIDE
 * OMNI-CHALAMANDRA
 *
 * Responsibility:
 * - Analyze point alignment and deviation
 * - Quantify visual tension for rendering
 * - No AI, no debate, no judgment
 */

export function analyzeColinearity(points = []) {
  if (!Array.isArray(points) || points.length < 3) {
    return {
      alignmentScore: 0,
      tension: 0,
      deviationMap: [],
      status: "INSUFFICIENT_DATA"
    };
  }

  const baseline = computeBaseline(points[0], points[points.length - 1]);
  let totalDeviation = 0;

  const deviationMap = points.map((p) => {
    const deviation = distanceFromLine(p, baseline);
    totalDeviation += deviation;
    return deviation;
  });

  const avgDeviation = totalDeviation / points.length;
  const alignmentScore = normalizeAlignment(avgDeviation);
  const tension = computeTension(alignmentScore);

  return {
    alignmentScore,
    tension,
    deviationMap,
    status: resolveStatus(alignmentScore)
  };
}

/* --------------------------------------------------
   INTERNAL MATH HELPERS
-------------------------------------------------- */

function computeBaseline(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return { p1, p2, dx, dy };
}

function distanceFromLine(point, baseline) {
  const { p1, dx, dy } = baseline;
  const numerator = Math.abs(
    dy * point.x - dx * point.y + baseline.p2.x * p1.y - baseline.p2.y * p1.x
  );
  const denominator = Math.sqrt(dx * dx + dy * dy);

  return denominator === 0 ? 0 : numerator / denominator;
}

function normalizeAlignment(avgDeviation) {
  // Lower deviation = higher alignment
  const score = 1 - Math.min(avgDeviation, 1);
  return Math.max(0, Math.min(1, score));
}

function computeTension(alignmentScore) {
  // Tension rises as alignment breaks
  return Number((1 - alignmentScore).toFixed(4));
}

function resolveStatus(alignmentScore) {
  if (alignmentScore > 0.85) return "HIGH_ALIGNMENT";
  if (alignmentScore > 0.6) return "MODERATE_ALIGNMENT";
  if (alignmentScore > 0.3) return "LOW_ALIGNMENT";
  return "FRACTURED";
}

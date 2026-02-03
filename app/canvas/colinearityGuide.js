/**
 * COLINEARITY GUIDE — OMNI-CHALAMANDRA
 * Responsibility: Precision math for point alignment.
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
    return Number(deviation.toFixed(2)); // Round for cleaner data
  });

  const avgDeviation = totalDeviation / points.length;
  const alignmentScore = Number(normalizeAlignment(avgDeviation).toFixed(4));
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
  return { 
    p1, 
    p2, 
    dx: p2.x - p1.x, 
    dy: p2.y - p1.y 
  };
}

function distanceFromLine(point, baseline) {
  const { p1, p2, dx, dy } = baseline;
  // Standard formula for distance from a point to a line defined by two points
  const numerator = Math.abs(
    dy * point.x - dx * point.y + p2.x * p1.y - p2.y * p1.x
  );
  const denominator = Math.sqrt(dx * dx + dy * dy);

  return denominator === 0 ? 0 : numerator / denominator;
}

function normalizeAlignment(avgDeviation) {
  // Threshold-based normalization (adjust 100 based on your canvas scale)
  const sensitivity = 50; 
  const score = 1 - Math.min(avgDeviation / sensitivity, 1);
  return Math.max(0, Math.min(1, score));
}

function computeTension(alignmentScore) {
  return Number((1 - alignmentScore).toFixed(4));
}

function resolveStatus(alignmentScore) {
  if (alignmentScore > 0.85) return "HIGH_ALIGNMENT";
  if (alignmentScore > 0.6) return "MODERATE_ALIGNMENT";
  if (alignmentScore > 0.3) return "LOW_ALIGNMENT";
  return "FRACTURED";
  }

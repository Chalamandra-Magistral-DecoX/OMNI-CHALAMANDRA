/**
 * COLINEARITY GUIDE — OMNI-CHALAMANDRA
 * Visual aid to help users select colinear points
 * before transmutation.
 */

/**
 * Draws a dynamic guide line between the first
 * and last selected point.
 * Helps enforce mathematical validity.
 */
export function drawColinearityGuide(ctx, points) {
  if (!ctx || points.length < 2) return;

  const first = points[0];
  const last = points[points.length - 1];

  ctx.save();

  ctx.strokeStyle = "rgba(0, 255, 255, 0.6)";
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);

  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  ctx.lineTo(last.x, last.y);
  ctx.stroke();

  ctx.restore();
}

/**
 * Highlights non-colinear deviation visually
 * when the third or fourth point drifts too far.
 */
export function drawDeviationWarning(ctx, baseLine, point) {
  if (!ctx || !baseLine || !point) return;

  const distance = perpendicularDistance(
    baseLine.start,
    baseLine.end,
    point
  );

  if (distance > 8) {
    ctx.save();

    ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

/**
 * Perpendicular distance from point to line
 */
function perpendicularDistance(A, B, P) {
  const numerator = Math.abs(
    (B.y - A.y) * P.x -
    (B.x - A.x) * P.y +
    B.x * A.y -
    B.y * A.x
  );

  const denominator = Math.hypot(
    B.y - A.y,
    B.x - A.x
  );

  if (denominator === 0) return 0;

  return numerator / denominator;
}

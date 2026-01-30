/**
 * COLINEARITY GUIDE
 * Visual guide to help users select 4 colinear points
 * Prevents invalid cross-ratio computation
 */

export function drawColinearityGuide(ctx, points) {
  if (points.length < 2) return;

  const p1 = points[0];
  const p2 = points[points.length - 1];

  ctx.save();
  ctx.strokeStyle = "rgba(0,255,255,0.4)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();

  ctx.restore();
}

export function areColinear(p1, p2, p3, tolerance = 5) {
  // Area of triangle method
  const area =
    p1.x * (p2.y - p3.y) +
    p2.x * (p3.y - p1.y) +
    p3.x * (p1.y - p2.y);

  return Math.abs(area) < tolerance;
}

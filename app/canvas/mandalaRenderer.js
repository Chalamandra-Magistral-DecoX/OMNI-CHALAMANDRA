/**
 * MANDALA RENDERER
 * Translates OMNI JSON into living geometry
 * This is NOT decoration — it is data visualization of coordination
 */

export function renderMandala(ctx, centerX, centerY, payload) {
  const {
    frecuencia_hz,
    geometria_sugerida,
    indice_coordinacion
  } = payload;

  ctx.save();
  ctx.translate(centerX, centerY);

  const baseRadius = 60 + indice_coordinacion * 120;
  const pulse = Math.sin(Date.now() / 300) * 5;

  ctx.strokeStyle = hsla(${mapFreqToHue(frecuencia_hz)}, 80%, 60%, 0.9);
  ctx.lineWidth = 2;

  switch (geometria_sugerida) {
    case "hexagono":
      drawPolygon(ctx, 6, baseRadius + pulse);
      break;
    case "pentagono":
      drawPolygon(ctx, 5, baseRadius + pulse);
      break;
    case "tetraedro":
      drawPolygon(ctx, 3, baseRadius + pulse);
      break;
    default:
      drawChaos(ctx, baseRadius);
  }

  ctx.restore();
}

/* -----------------------------
   GEOMETRY PRIMITIVES
----------------------------- */

function drawPolygon(ctx, sides, radius) {
  const angle = (Math.PI * 2) / sides;

  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const x = Math.cos(i * angle) * radius;
    const y = Math.sin(i * angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawChaos(ctx, radius) {
  ctx.beginPath();
  for (let i = 0; i < 20; i++) {
    const x = (Math.random() - 0.5) * radius * 2;
    const y = (Math.random() - 0.5) * radius * 2;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

/* -----------------------------
   FREQUENCY → COLOR
----------------------------- */

function mapFreqToHue(freq) {
  // 432–528 Hz → 180–360 hue
  return ((freq - 432) / (528 - 432)) * 180 + 180;
}

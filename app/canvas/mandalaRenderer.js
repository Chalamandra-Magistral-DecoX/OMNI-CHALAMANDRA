/**
 * MANDALA RENDERER — OMNI-CHALAMANDRA
 * Responsibility: Convert validated signals into drawable geometry structures.
 */

/**
 * Builds a geometric object based on AI-debated signals and math invariants.
 * @param {Object} signals - The output_signals and input_analysis from the payload.
 */
export function buildMandalaGeometry({
  geometryType,
  frequencyHz,
  crossRatio,
  colinearity
}) {
  console.log(">> MANDALA: Building geometry construction...");

  // Normalization to keep the mandala within the viewport
  const baseRadius = normalizeFrequency(frequencyHz);
  const symmetry = resolveSymmetry(geometryType);
  const rotation = (crossRatio || 1.0) * Math.PI;

  const layers = [];

  for (let i = 0; i < symmetry; i++) {
    const angle = (2 * Math.PI / symmetry) * i + rotation;

    layers.push({
      id: `layer_${i}`, // Corrected Template Literal
      angle,
      // Tension expands the radius, alignmentScore defines the presence
      radius: baseRadius * (1 + (colinearity?.tension || 0)),
      opacity: resolveOpacity(colinearity?.alignmentScore || 1),
      weight: resolveWeight(crossRatio)
    });
  }

  return {
    type: geometryType,
    symmetry,
    frequency_hz: frequencyHz,
    base_radius: baseRadius,
    layers,
    render_hint: resolveRenderHint(geometryType)
  };
}

/**
 * Renders the mandala to the provided canvas context.
 * @param {CanvasRenderingContext2D} ctx - The target canvas context.
 * @param {Object} finalPayload - The complete system payload.
 */
export function renderMandala(ctx, finalPayload) {
  const { input_analysis, debate } = finalPayload;

  const geometry = buildMandalaGeometry({
    geometryType: debate?.output_signals?.geometry || "STANDARD",
    frequencyHz: debate?.output_signals?.frequency_hz || 432,
    crossRatio: input_analysis?.cross_ratio || 1.0,
    colinearity: input_analysis?.colinearity || { tension: 0, alignmentScore: 1 }
  });

  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);

  // Set global styles for the mandala
  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(0, 243, 255, 0.8)";
  ctx.lineCap = "round";

  geometry.layers.forEach((layer, idx) => {
    ctx.save();
    ctx.rotate(layer.angle);

    // Aesthetic variation based on layer index
    const hue = 180 + (idx * 20);
    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${layer.opacity})`;
    ctx.lineWidth = layer.weight * 2;

    ctx.beginPath();
    // We use a scale factor of 200 for the radius
    ctx.arc(0, 0, layer.radius * 200, 0, Math.PI * 2);
    ctx.stroke();

    // Add some internal "sacred geometry" lines
    if (idx % 2 === 0) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(layer.radius * 200, 0);
      ctx.globalAlpha = layer.opacity * 0.5;
      ctx.stroke();
    }

    ctx.restore();
  });

  ctx.restore();
  console.log(">> MANDALA: Rendering complete.");
}

/* --------------------------------------------------
   INTERNAL HELPERS (PURE MATH / VISUAL)
-------------------------------------------------- */

function normalizeFrequency(freq) {
  // Visual mapping: converts Hz into a scale factor (30% to 100%)
  return Math.min(1.0, Math.max(0.3, freq / 1000));
}

function resolveSymmetry(geometryType) {
  // Balanced with previous invariant mapping
  switch (geometryType) {
    case "HARMONIC_GOLDEN":     return 8; 
    case "HARMONIC_EXPANSION":  return 12;
    case "STABLE_COMPRESSION":  return 6;
    case "PARADIGM_INVERSION":  return 4;
    case "DISRUPTIVE_EXPANSION": return 7;
    default:                    return 6;
  }
}

function resolveOpacity(alignmentScore) {
  // High fracture = low opacity (loss of reality/stability)
  return Math.min(1, Math.max(0.2, alignmentScore));
}

function resolveWeight(crossRatio) {
  if (crossRatio > 1.5) return 2.5;
  if (crossRatio > 1.0) return 1.5;
  return 0.8;
}

function resolveRenderHint(geometryType) {
  switch (geometryType) {
    case "HARMONIC_EXPANSION": return "ROTATIONAL_FLOW";
    case "PARADIGM_INVERSION": return "NOISE_PERTURBATION";
    default:                   return "SYMMETRIC_STATIC";
  }
}

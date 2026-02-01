/**
 * MANDALA RENDERER
 * OMNI-CHALAMANDRA
 *
 * Responsibility:
 * - Convert validated signals into drawable geometry
 * - No reasoning, no validation, no AI logic
 * - Pure geometric construction
 */

export function buildMandalaGeometry({
  geometryType,
  frequencyHz,
  crossRatio,
  colinearity
}) {
  console.log(">> MANDALA: Building geometry...");

  const baseRadius = normalizeFrequency(frequencyHz);
  const symmetry = resolveSymmetry(geometryType);
  const rotation = crossRatio * Math.PI;

  const layers = [];

  for (let i = 0; i < symmetry; i++) {
    const angle = (2 * Math.PI / symmetry) * i + rotation;

    layers.push({
      id: layer_${i},
      angle,
      radius: baseRadius * (1 + colinearity.tension),
      opacity: resolveOpacity(colinearity.alignmentScore),
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

/* --------------------------------------------------
   INTERNAL HELPERS (PURE MATH / VISUAL)
-------------------------------------------------- */

function normalizeFrequency(freq) {
  // Keeps radius visually stable across wide Hz ranges
  return Math.min(1.0, Math.max(0.3, freq / 1000));
}

function resolveSymmetry(geometryType) {
  switch (geometryType) {
    case "HEXAGONAL":
      return 6;
    case "OCTAGONAL":
      return 8;
    case "SPIRAL":
      return 12;
    case "CHAOTIC":
      return 5;
    default:
      return 6;
  }
}

function resolveOpacity(alignmentScore) {
  return Math.min(1, Math.max(0.2, alignmentScore));
}

function resolveWeight(crossRatio) {
  if (crossRatio > 1.5) return 2.5;
  if (crossRatio > 1.0) return 1.5;
  return 0.8;
}

function resolveRenderHint(geometryType) {
  switch (geometryType) {
    case "SPIRAL":
      return "ROTATIONAL_FLOW";
    case "CHAOTIC":
      return "NOISE_PERTURBATION";
    default:
      return "SYMMETRIC_STATIC";
  }
}

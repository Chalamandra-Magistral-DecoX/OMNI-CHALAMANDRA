/**
 * MANDALA RENDERER — OMNI-CHALAMANDRA
 * Responsibility: Convert validated signals into drawable geometry structures.
 */

export function buildMandalaGeometry({
  geometryType,
  frequencyHz,
  crossRatio,
  colinearity
}) {
  console.log(">> MANDALA: Building geometry construction...");

  // Normalización para mantener el mandala dentro del canvas
  const baseRadius = normalizeFrequency(frequencyHz);
  const symmetry = resolveSymmetry(geometryType);
  const rotation = (crossRatio || 1.0) * Math.PI;

  const layers = [];

  for (let i = 0; i < symmetry; i++) {
    const angle = (2 * Math.PI / symmetry) * i + rotation;

    layers.push({
      id: layer_${i}, // Corregido: Template literal para el ID
      angle,
      // La tensión expande el radio, el colineality.alignmentScore lo define
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

/* --------------------------------------------------
   INTERNAL HELPERS (PURE MATH / VISUAL)
-------------------------------------------------- */

function normalizeFrequency(freq) {
  // Mapeo visual: convierte Hz en un factor de escala (0.3 a 1.0)
  return Math.min(1.0, Math.max(0.3, freq / 1000));
}

function resolveSymmetry(geometryType) {
  switch (geometryType) {
    case "HEXAGON":      return 6; // Alineado con invariantconfig.js
    case "PENTAGON":     return 5;
    case "TETRAHEDRON":  return 3;
    case "SPIRAL":       return 12;
    case "CHAOTIC":      return 7;
    default:             return 6;
  }
}

function resolveOpacity(alignmentScore) {
  // Si la alineación es baja, el mandala se desvanece (pérdida de realidad)
  return Math.min(1, Math.max(0.2, alignmentScore));
}

function resolveWeight(crossRatio) {
  if (crossRatio > 1.5) return 2.5;
  if (crossRatio > 1.0) return 1.5;
  return 0.8;
}

function resolveRenderHint(geometryType) {
  switch (geometryType) {
    case "SPIRAL":  return "ROTATIONAL_FLOW";
    case "CHAOTIC": return "NOISE_PERTURBATION";
    default:        return "SYMMETRIC_STATIC";
  }
}

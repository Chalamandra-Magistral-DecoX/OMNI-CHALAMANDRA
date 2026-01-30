/**
 * VALIDATOR AGENT
 * ----------------
 * Enforces strict schema validation.
 * Prevents UI crashes.
 * Prevents hallucinated structures from reaching rendering.
 *
 * If validation fails → system degrades gracefully.
 */

const REQUIRED_FIELDS = [
  "frecuencia_hz",
  "geometria_sugerida",
  "capa_dominante",
  "indice_coordinacion",
  "puntos_de_fuga"
];

const VALID_GEOMETRIES = ["hexagono", "pentagono", "tetraedro"];
const VALID_LAYERS = ["NEURO", "NARRATIVA", "SANACIÓN", "TECNO", "PROTOCOLO"];

export function validateOutput(payload) {
  try {
    if (!payload || typeof payload !== "object") {
      return invalid("Payload is not an object");
    }

    if (payload.error === true) {
      return invalid("Payload already marked as error");
    }

    for (const field of REQUIRED_FIELDS) {
      if (!(field in payload)) {
        return invalid(Missing required field: ${field});
      }
    }

    if (
      typeof payload.frecuencia_hz !== "number" ||
      payload.frecuencia_hz < 100 ||
      payload.frecuencia_hz > 1000
    ) {
      return invalid("Invalid frequency range");
    }

    if (!VALID_GEOMETRIES.includes(payload.geometr

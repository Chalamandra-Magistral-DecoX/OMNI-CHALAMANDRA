/**
 * VALIDATOR AGENT — SCHEMA GUARDIAN
 * ================================
 * Purpose:
 * - Ensure Gemini output is valid, complete, and safe for UI rendering
 * - Prevent canvas crashes due to malformed JSON
 * - Enforce contract between reasoning engine and visual system
 *
 * This agent does NOT think.
 * This agent protects.
 */

const REQUIRED_FIELDS = [
  "frecuencia_hz",
  "geometria_sugerida",
  "capa_dominante",
  "indice_coordinacion",
  "puntos_de_fuga",
  "analisis_por_capa",
  "veredicto_jorge"
];

export function validateOutput(payload) {
  console.log(">> VALIDATOR: Checking schema integrity...");

  if (!payload || typeof payload !== "object") {
    return invalid("Payload is not an object");
  }

  // --------------------------------------------------
  // 1. Required top-level fields
  // --------------------------------------------------
  for (const field of REQUIRED_FIELDS) {
    if (!(field in payload)) {
      return invalid(Missing required field: ${field});
    }
  }

  // --------------------------------------------------
  // 2. Type validation
  // --------------------------------------------------
  if (typeof payload.frecuencia_hz !== "number") {
    return invalid("frecuencia_hz must be a number");
  }

  if (!Array.isArray(payload.geometria_sugerida)) {
    return invalid("geometria_sugerida must be an array");
  }

  if (typeof payload.capa_dominante !== "string") {
    return invalid("capa_dominante must be a string");
  }

  if (
    typeof payload.indice_coordinacion !== "number" ||
    payload.indice_coordinacion < 0 ||
    payload.indice_coordinacion > 1
  ) {
    return invalid("indice_coordinacion must be between 0 and 1");
  }

  if (!Array.isArray(payload.puntos_de_fuga)) {
    return invalid("puntos_de_fuga must be an array");
  }

  if (typeof payload.analisis_por_capa !== "object") {
    return invalid("analisis_por_capa must be an object");
  }

  if (typeof payload.veredicto_jorge !== "string") {
    return invalid("veredicto_jorge must be a string");
  }

  // --------------------------------------------------
  // 3. Safety clamps (prevents visual/audio explosions)
  // --------------------------------------------------
  payload.frecuencia_hz = clamp(payload.frecuencia_hz, 100, 1000);
  payload.indice_coordinacion = clamp(payload.indice_coordinacion, 0, 1);

  // --------------------------------------------------
  // 4. Passed
  // --------------------------------------------------
  console.log(">> VALIDATOR: Schema valid.");
  return {
    isValid: true,
    payload
  };
}

// --------------------------------------------------
// Internal helpers
// --------------------------------------------------
function invalid(message) {
  console.warn(">> VALIDATOR FAILED:", message);
  return {
    isValid: false,
    errorMsg: message
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

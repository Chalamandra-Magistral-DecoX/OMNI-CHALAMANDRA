/**
 * VALIDATOR AGENT
 * Enforces structural integrity of OMNI-CHALAMANDRA output.
 * Prevents UI crashes and invalid symbolic states.
 */

export function validateOutput(payload) {
  const errors = [];

  /* -----------------------------
     BASIC STRUCTURE
  ----------------------------- */
  if (!payload) {
    return invalid("Empty payload received");
  }

  /* -----------------------------
     REQUIRED FIELDS
  ----------------------------- */
  const requiredFields = [
    "frecuencia_hz",
    "geometria_sugerida",
    "capa_dominante",
    "indice_coordinacion",
    "puntos_de_fuga",
    "analisis_por_capa",
    "veredicto_jorge"
  ];

  requiredFields.forEach(field => {
    if (payload[field] === undefined) {
      errors.push(Missing field: ${field});
    }
  });

  /* -----------------------------
     TYPE VALIDATION
  ----------------------------- */
  if (typeof payload.frecuencia_hz !== "number") {
    errors.push("frecuencia_hz must be a number");
  }

  if (!Array.isArray(payload.puntos_de_fuga)) {
    errors.push("puntos_de_fuga must be an array");
  }

  if (typeof payload.analisis_por_capa !== "object") {
    errors.push("analisis_por_capa must be an object");
  }

  /* -----------------------------
     RANGE VALIDATION
  ----------------------------- */
  if (
    payload.frecuencia_hz < 400 ||
    payload.frecuencia_hz > 600
  ) {
    errors.push("frecuencia_hz out of safe range (400–600)");
  }

  if (
    payload.indice_coordinacion < 0 ||
    payload.indice_coordinacion > 1
  ) {
    errors.push("indice_coordinacion must be between 0 and 1");
  }

  /* -----------------------------
     GEOMETRY SAFETY
  ----------------------------- */
  const allowedGeometries = ["hexagono", "pentagono", "tetraedro", "caotica"];
  if (!allowedGeometries.includes(payload.geometria_sugerida)) {
    errors.push("Invalid geometria_sugerida");
  }

  /* -----------------------------
     FINAL DECISION
  ----------------------------- */
  if (errors.length > 0) {
    return invalid(errors.join(" | "));
  }

  return {
    isValid: true,
    payload
  };
}

/* --------------------------------
   Helpers
-------------------------------- */
function invalid(msg) {
  return {
    isValid: false,
    errorMsg: msg
  };
}

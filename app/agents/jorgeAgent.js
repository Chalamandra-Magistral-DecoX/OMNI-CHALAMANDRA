/**
 * JORGE — SHADOW AUDITOR AGENT
 * ----------------------------
 * Purpose:
 * - Detect over-optimism and hallucination patterns
 * - Enforce realism and practical constraints
 * - Trigger visual panic when output is unstable
 *
 * Jorge is NOT negative.
 * He is a safety layer.
 */

export function auditWithJorge(geminiOutput, crossRatioValue) {
  console.log(">> JORGE: Starting shadow audit...");

  let panic = false;
  let fraudScore = 0;

  // --------------------------------------------------
  // 1. Basic sanity check
  // --------------------------------------------------
  if (!geminiOutput || typeof geminiOutput !== "object") {
    return panicResponse("Invalid or empty Gemini output");
  }

  // --------------------------------------------------
  // 2. Detect extreme or suspicious values
  // --------------------------------------------------
  if (crossRatioValue < 0 || crossRatioValue > 10) {
    fraudScore += 30;
  }

  if (geminiOutput.indice_coordinacion > 1 || geminiOutput.indice_coordinacion < 0) {
    fraudScore += 25;
  }

  if (!geminiOutput.capa_dominante) {
    fraudScore += 20;
  }

  if (!geminiOutput.frecuencia_hz) {
    fraudScore += 20;
  }

  // --------------------------------------------------
  // 3. Semantic overconfidence detection
  // --------------------------------------------------
  const jorgeKeywords = [
    "guaranteed",
    "perfect",
    "always",
    "never",
    "absolute truth",
    "no risk"
  ];

  const serialized = JSON.stringify(geminiOutput).toLowerCase();
  jorgeKeywords.forEach(word => {
    if (serialized.includes(word)) {
      fraudScore += 10;
    }
  });

  // --------------------------------------------------
  // 4. Panic threshold
  // --------------------------------------------------
  if (fraudScore >= 50) {
    panic = true;
  }

  // --------------------------------------------------
  // 5. Attach Jorge's verdict
  // --------------------------------------------------
  geminiOutput.jorge_audit = {
    triggered: panic,
    fraud_score: fraudScore,
    verdict: panic
      ? "System confidence is unstable. Output should be interpreted symbolically."
      : "Output passed realism audit.",
    cross_ratio_reference: crossRatioValue
  };

  geminiOutput.jorge_panic_trigger = panic;

  console.log(>> JORGE: Audit complete (score=${fraudScore}));

  return geminiOutput;
}

// --------------------------------------------------
// INTERNAL: Panic fallback
// --------------------------------------------------
function panicResponse(reason) {
  console.warn(">> JORGE PANIC:", reason);

  return {
    error: true,
    jorge_panic_trigger: true,
    jorge_audit: {
      triggered: true,
      fraud_score: 100,
      verdict: CRITICAL FAILURE: ${reason}
    }
  };
}

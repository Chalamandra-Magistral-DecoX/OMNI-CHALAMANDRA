/**
 * VALIDATOR AGENT — OMNI-CHALAMANDRA
 * Role: Output integrity & schema enforcement
 *
 * Responsibilities:
 * - Extract the FINAL JSON block from Gemini output
 * - Validate required fields
 * - Prevent UI / Canvas crashes
 *
 * IMPORTANT:
 * - This agent does NOT modify meaning
 * - It only accepts or rejects
 */

export function validateOutput(rawGeminiOutput) {
  console.log(">> VALIDATOR: Parsing Gemini output...");

  try {
    if (typeof rawGeminiOutput !== "string") {
      return invalid("Output is not a string.");
    }

    /* --------------------------------------------------
       1. EXTRACT JSON BLOCK
       Assumes JSON is LAST thing in the response
    -------------------------------------------------- */
    const jsonStart = rawGeminiOutput.lastIndexOf("{");
    const jsonEnd = rawGeminiOutput.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return invalid("No JSON block detected.");
    }

    const jsonString = rawGeminiOutput.slice(
      jsonStart,
      jsonEnd + 1
    );

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      return invalid("JSON parsing failed.");
    }

    /* --------------------------------------------------
       2. SCHEMA VALIDATION (MINIMAL BUT STRICT)
    -------------------------------------------------- */

    const requiredTopLevel = [
      "hackathon_project",
      "input_analysis",
      "output_signals",
      "dominant_layer",
      "agent_insights",
      "shadow_verdict",
      "action_plan",
      "chain_data"
    ];

    for (const key of requiredTopLevel) {
      if (!(key in parsed)) {
        return invalid(Missing top-level key: ${key});
      }
    }

    // Shadow audit integrity (JORGE)
    if (
      parsed.shadow_verdict.auditor !== "JORGE" ||
      typeof parsed.shadow_verdict.hallucination_score !== "number"
    ) {
      return invalid("Shadow audit invalid or missing.");
    }

    /* --------------------------------------------------
       3. PANIC SIGNAL NORMALIZATION
    -------------------------------------------------- */
    parsed.jorge_panic_trigger =
      parsed.shadow_verdict.panic_triggered === true ||
      parsed.shadow_verdict.hallucination_score > 70;

    console.log(">> VALIDATOR: Output accepted.");
    return {
      isValid: true,
      payload: parsed
    };

  } catch (error) {
    console.error(">> VALIDATOR ERROR:", error);
    return invalid("Unexpected validation failure.");
  }
}

/* --------------------------------------------------
   HELPERS
-------------------------------------------------- */

function invalid(message) {
  console.warn(">> VALIDATOR REJECTED:", message);
  return {
    isValid: false,
    errorMsg: message
  };
}

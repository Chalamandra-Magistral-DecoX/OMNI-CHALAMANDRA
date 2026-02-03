/**
 * VALIDATOR AGENT — OMNI-CHALAMANDRA
 * Role: Output integrity & schema enforcement (Aligned with GEORGE)
 */

export function validateOutput(rawGeminiOutput) {
  console.log(">> VALIDATOR: Parsing Gemini output...");

  try {
    if (typeof rawGeminiOutput !== "string") {
      return invalid("Output is not a string.");
    }

    /* --------------------------------------------------
       1. EXTRACT JSON BLOCK
       Locates the last valid JSON object in the string
    -------------------------------------------------- */
    const jsonStart = rawGeminiOutput.lastIndexOf("{");
    const jsonEnd = rawGeminiOutput.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return invalid("No JSON block detected.");
    }

    const jsonString = rawGeminiOutput.slice(jsonStart, jsonEnd + 1);

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      return invalid("JSON parsing failed. Ensure no text follows the JSON block.");
    }

    /* --------------------------------------------------
       2. SCHEMA VALIDATION (STRICT ALIGNMENT)
       Updated to match configPrompt.js fields
    -------------------------------------------------- */
    const requiredTopLevel = [
      "project",
      "input_analysis",
      "output_signals",
      "agent_insights",
      "shadow_audit", // Corrected from shadow_verdict
      "chain_data"
    ];

    for (const key of requiredTopLevel) {
      if (!(key in parsed)) {
        return invalid(Missing top-level key: ${key});
      }
    }

    // Shadow audit integrity (GEORGE - Final Check)
    if (
      parsed.shadow_audit.auditor !== "GEORGE" ||
      typeof parsed.shadow_audit.panic_triggered !== "boolean"
    ) {
      return invalid("Shadow audit (GEORGE) data is invalid or missing.");
    }

    /* --------------------------------------------------
       3. SYSTEM NORMALIZATION
    -------------------------------------------------- */
    // Ensure all numeric values from prompt exist
    if (typeof parsed.output_signals.frequency_hz !== "number") {
      parsed.output_signals.frequency_hz = 432; // Fallback to avoid audio crash
    }

    console.log(">> VALIDATOR: Integrity verified. Output accepted.");
    return {
      isValid: true,
      payload: parsed
    };

  } catch (error) {
    console.error(">> VALIDATOR ERROR:", error);
    return invalid("Unexpected validation failure.");
  }
}

function invalid(message) {
  console.warn(">> VALIDATOR REJECTED:", message);
  return {
    isValid: false,
    errorMsg: message
  };
}

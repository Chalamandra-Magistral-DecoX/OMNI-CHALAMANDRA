/**
 * OMNI-CHALAMANDRA — VALIDATOR
 * Ensures output matches the required system schema
 */
export function validateOutput(payload) {
  try {
    const requiredKeys = ["george_verdict", "visual_signals", "debate_transcript"];
    const hasAllKeys = requiredKeys.every(key => payload.hasOwnProperty(key));

    if (!hasAllKeys) {
      return { isValid: false, errorMsg: "Missing core payload keys" };
    }

    return {
      isValid: true,
      payload: payload
    };
  } catch (e) {
    return { isValid: false, errorMsg: "Invalid JSON format" };
  }
}

/**
 * Runtime secrets for local prototyping.
 * NOTE: Do not commit real API keys. Use window.OMNI_CONFIG or localStorage.
 */
const runtimeKey = typeof window !== "undefined"
  ? window.OMNI_CONFIG?.GOOGLE_API_KEY || window.localStorage?.getItem("OMNI_GEMINI_API_KEY")
  : "";

export const GOOGLE_API_KEY = runtimeKey || "";

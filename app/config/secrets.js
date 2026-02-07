/**
 * OMNI-CHALAMANDRA — ENVIRONMENT SECRETS
 * API keys are loaded from the environment to ensure security.
 */
export const GOOGLE_API_KEY = (typeof process !== 'undefined' && process.env.GOOGLE_API_KEY) || "";

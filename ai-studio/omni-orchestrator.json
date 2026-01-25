import { runGeminiDebate } from "./geminiAgent.js";
import { auditWithJorge } from "./jorgeAgent.js";
import { validateOutput } from "./validatorAgent.js";
import { triggerPanic } from "../feedback/glitchEngine.js";

/**
 * OMNI-CHALAMANDRA MAIN ORCHESTRATOR
 * Coordinates the data flow between Reality (Canvas),
 * Generative AI (Gemini), and the Shadow Auditor (JORGE).
 */
export async function orchestrateOMNI(input) {
    console.log(">> ORCHESTRATOR: Projection sequence initiated...");
    console.log(>> PARAMETERS: R=${input.crossRatio} | Seed=${input.mandalaSeed});

    try {
        // 1. INFERENCE PHASE (Gemini)
        // Send image + mathematical invariants to the Gemini agent
        const rawDebate = await runGeminiDebate(input);

        // 2. AUDIT PHASE (JORGE)
        // Jorge injects skepticism and detects hallucination or narrative inflation
        const auditedResult = auditWithJorge(rawDebate, input.crossRatio);

        // If Jorge detects a critical anomaly, trigger visual panic mode
        if (auditedResult.jorge_panic_trigger) {
            triggerPanic();
        }

        // 3. VALIDATION PHASE (Schema Enforcement)
        // Ensure the output is structurally valid JSON for downstream systems
        const validation = validateOutput(auditedResult);

        if (!validation.isValid) {
            throw new Error(Schema violation: ${validation.errorMsg});
        }

        // 4. CLEAN RETURN
        // Return a safe, validated payload for rendering and sonification
        return validation.payload;

    } catch (error) {
        console.error(">> CRITICAL ORCHESTRATOR FAILURE:", error);

        // Total failure triggers system-level visual feedback
        triggerPanic();

        // Controlled error object so the UI never freezes
        return {
            error: true,
            message: error.message || "Core synchronization failure."
        };
    }
}

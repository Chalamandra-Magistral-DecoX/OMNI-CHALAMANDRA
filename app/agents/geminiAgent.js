import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * GEMINI AGENT
 * Handles multimodal reasoning using Gemini 3 via AI Studio.
 * Receives mathematical invariants + image context
 * Returns a structured expert debate as JSON.
 */

// Gemini client (API key must be set in environment variables)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// We explicitly use a reasoning-capable model
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro" // Gemini 3 equivalent in AI Studio free tier
});

export async function runGeminiDebate(input) {
    const {
        crossRatio,
        imageBase64,
        mandalaSeed,
        dnaChain
    } = input;

    console.log(">> GEMINI AGENT: Running multimodal reasoning...");

    // System-level intent (NOT a single-prompt wrapper)
    const systemPrompt = `
You are OMNI-CHALAMANDRA, a cognitive fortress.

You operate as a council of experts:
- Scientist (Neurobiology)
- Philosopher (Ontology & Telos)
- Psychologist (Shadow & Trauma)
- Historian (Entropy & Cycles)
- Futurist (Techno-evolution)
- JORGE (Shadow Auditor, ruthless realism)

Rules:
- Mathematics precedes interpretation.
- The Cross Ratio (R) is an invariant. Treat it as objective reality.
- You must debate internally before producing output.
- Output MUST be valid JSON.
- No metaphysical claims without structural grounding.
`;

    // User-level payload (what makes this an application, not a chatbot)
    const userPrompt = `
INPUT SIGNAL DETECTED

Cross Ratio (Invariant): ${crossRatio}
Mandala Seed: ${mandalaSeed}
DNA Chain Hash (previous context): ${dnaChain || "GENESIS"}

Task:
1. Interpret the invariant R as a systemic signature.
2. Run an internal expert debate.
3. Detect coordination failures or strengths.
4. Produce a reusable JSON blueprint.

Output schema (MANDATORY):
{
  "resonance_hz": number,
  "mandala_coordinates": [{ "x": number, "y": number, "z": number }],
  "survival_protocol": {
    "type": "cognitive | spatial | temporal",
    "instruction": "string"
  },
  "jorge_panic_trigger": boolean,
  "dna_chain_hash": "string"
}
`;

    // Multimodal input (image + reasoning)
    const parts = [
        { text: systemPrompt },
        { text: userPrompt }
    ];

    // If an image exists, include it (this is CRITICAL for the hackathon)
    if (imageBase64) {
        parts.push({
            inlineData: {
                mimeType: "image/png",
                data: imageBase64
            }
        });
    }

    const result = await model.generateContent({
        contents: [{ role: "user", parts }]
    });

    const responseText = result.response.text();

    // Gemini sometimes wraps JSON in markdown — we strip it safely
    const cleaned = responseText
        .replace(/json/g, "")
        .replace(//g, "")
        .trim();

    console.log(">> GEMINI AGENT: Debate completed.");

    return JSON.parse(cleaned);
}

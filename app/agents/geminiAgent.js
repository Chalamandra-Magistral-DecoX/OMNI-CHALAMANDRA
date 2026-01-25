[4:56 p.m., 25/1/2026] 🦈: /**
 * GEMINI AGENT
 * Encargado de la comunicación con el Proxy Server.
 * Transforma los datos crudos en un prompt multimodal.
 */

const PROXY_URL = "http://localhost:3000/api/transmutar"; // Tu servidor local

export async function runGeminiDebate(input) {
  const { crossRatio, imageDNA, mandalaSeed } = input;

  console.log(">> GEMINI AGENT: Contactando al Núcleo...");

  // 1. Construcción del Prompt
  // Inyectamos la matemática (R) y la semilla del caos
  const promptText = `
    CONTEXTO MATEMÁTICO: Razón Anarmónica R=${crossRatio}.
    SEMILLA DEL CAOS: ${mandalaSeed}.
    
    TAREA:
    Analiza la IMAGEN adjunta bajo estos parámetros.
    Genera un debate técnico y esotérico sobre la validez de esta realidad.
    JORGE (el auditor) debe buscar fa…
[4:58 p.m., 25/1/2026] 🦈: import { GoogleGenerativeAI } from "@google/generative-ai";

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

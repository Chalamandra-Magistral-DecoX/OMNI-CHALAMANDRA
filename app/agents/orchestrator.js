import { runGeminiDebate } from "./geminiAgent.js";
import { auditWithJorge } from "./jorgeAgent.js";
import { validateOutput } from "./validatorAgent.js";
import { triggerPanic } from "../feedback/glitchEngine.js";

/**
 * ORQUESTADOR PRINCIPAL OMNI-CHALAMANDRA
 * Coordina el flujo de datos entre la realidad (Canvas),
 * la IA (Gemini), la Sombra (Jorge) y la Validación.
 */
export async function orchestrateOMNI(input) {
  console.log(">> ORCHESTRATOR: Iniciando secuencia de proyección...");
  // CORRECCIÓN 1: Uso de backticks (`) para template literals
  console.log(`>> PARAMETERS: R=${input.crossRatio} | Seed=${input.mandalaSeed}`);

  try {
    /* --------------------------------------------------
       1. FASE DE INFERENCIA (Gemini Reasoning Engine)
    -------------------------------------------------- */
    const rawReasoning = await runGeminiDebate(input);

    /* --------------------------------------------------
       2. FASE DE AUDITORÍA DE SOMBRA (Jorge)
    -------------------------------------------------- */
    const auditedResult = auditWithJorge(rawReasoning, input.crossRatio);

    if (auditedResult.jorge_panic_trigger === true) {
      console.warn(">> JORGE PANIC TRIGGERED — Activando glitch visual");
      triggerPanic();
    }

    /* --------------------------------------------------
       3. FASE DE VALIDACIÓN (Integridad del Schema)
    -------------------------------------------------- */
    const validation = validateOutput(auditedResult);

    if (!validation.isValid) {
      // CORRECCIÓN 1: Backticks aquí también
      throw new Error(`Schema violation: ${validation.errorMsg}`);
    }

    /* --------------------------------------------------
       4. RETORNO LIMPIO (Payload seguro para UI)
    -------------------------------------------------- */
    console.log(">> ORCHESTRATOR: Secuencia completada con éxito.");
    return validation.payload;

  } catch (error) {
    console.error(">> ORCHESTRATOR FALLO CRÍTICO:", error);

    /* Feedback visual para que el usuario sepa que algo pasó */
    triggerPanic();

    /* CORRECCIÓN 2: FALLBACK ALINEADO CON EL SCHEMA
       Este objeto debe tener LA MISMA estructura que el JSON 
       que definimos en omni-orchestrator.json
    */
    return {
      error: true,
      message: error.message || "Fallo de sincronización con el Núcleo OMNI.",
      // Estructura que coincide con lo que espera tu Canvas
      hexago_cognitivo: {
        neuro: {
             arquetipo: "Científico",
             analisis: "SISTEMA EN MODO SEGURO. NO HAY DATOS NEUROLÓGICOS.",
             frecuencia_hz: 444 // Frecuencia de seguridad
        },
        protocolo: {
             arquetipo: "Futurista",
             propuesta_gobernanza: "Intervención manual recomendada.",
             indice_coordinacion: 0
        },
        narrativa: {
             arquetipo: "Filósofo",
             mito_detectado: "Caída del Sistema",
             geometria_sugerida: "Caótica" // Esto le dice al canvas qué dibujar
        },
        auditoria_jorge: {
             arquetipo: "Auditor Cínico",
             veredicto_brutal: "FALLO DEL SISTEMA — NO CONFÍES EN ESTA SALIDA.",
             nivel_fraude_detectado: 100,
             frecuencia_ruido: 50.0
        }
      },
      sintesis_final: "El sistema ha recuperado el control tras un fallo crítico."
    };
  }
}

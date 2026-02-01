// app/main.js

import { CanvasController } from "./canvas/CanvasController.js";

import { runAgentDebate } from "./agents/debateController.js";
import { runGeorgeAudit } from "./agents/GeorgeAgent.js";

import { AudioEngine } from "./feedback/audioEngine.js";
import { VisualEngine } from "./feedback/visualEngine.js";
import { GlitchEngine } from "./feedback/glitchEngine.js";

import { exportResultJSON } from "./export/exportJson.js";

export async function runOmniChalamandra({
  imageInput,
  mandalaSeed,
  computedValues,
  hashChain
}) {
  // 1. Render mandala + extract geometric invariant
  const canvasController = new CanvasController();
  const geometryResult = canvasController.render({
    imageInput,
    mandalaSeed
  });

  const crossRatio = geometryResult.crossRatio;

  // 2. Run 5-agent structured debate
  const debateResult = await runAgentDebate({
    crossRatio,
    mandalaSeed,
    computedValues,
    hashChain
  });

  // 3. George = FINAL auditor (6th voice, not debate)
  const georgeVerdict = runGeorgeAudit({
    debate: debateResult,
    crossRatio,
    computedValues
  });

  // 4. Feedback orchestration (DECIDED BY GEORGE)
  VisualEngine.apply({
    geometry: computedValues.geometryCategory,
    stability: computedValues.stabilityScore
  });

  if (georgeVerdict.panicTriggered) {
    GlitchEngine.trigger({
      intensity: georgeVerdict.glitchIntensity
    });
  } else {
    AudioEngine.play({
      frequencyHz: computedValues.frequencyHz
    });
  }

  // 5. Exportable final artifact (debate + George + signals)
  const finalPayload = {
    debate: debateResult,
    george: georgeVerdict,
    signals: computedValues,
    crossRatio,
    hashChain
  };

  exportResultJSON(finalPayload);

  return finalPayload;
}

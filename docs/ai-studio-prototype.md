# AI Studio Prototype Guide (Gemini 3 Hackathon)

This guide helps you build a polished demo in Google AI Studio while keeping the prototype aligned with the OMNI-CHALAMANDRA architecture.

## 1) Create the prompt scaffold
1. Open **Google AI Studio** and create a new prompt.
2. Paste the core prompt from `app/config/configPrompt.js`.
3. Replace the dynamic fields (cross ratio, signals, hash chain) with sample values so the model output is stable during judging.

## 2) Configure response format
1. Set **responseMimeType** to `application/json`.
2. Keep **temperature** around `0.7–0.9` for persona richness without losing structure.
3. Cap **maxOutputTokens** to ~3000 to allow the full debate + audit.

## 3) Build the demo story
1. Explain that *math comes first* (cross-ratio is deterministic).
2. Show how the five agents debate different perspectives.
3. Show **George** enforcing verification and triggering a panic state if needed.
4. Map the result to the mandala + audio output.

## 4) Prepare a judge-facing runbook
1. Keep 2–3 precomputed example inputs (R values + computed signals).
2. Have a "panic-mode" example ready to prove safeguards.
3. Keep a short narrative around "verifiable reasoning" and "geometric grounding."

## 5) Bridge to the web prototype
1. Ensure the schema in AI Studio matches the validator expectations.
2. Use the same JSON keys the UI expects so there are no demo-time surprises.

## 6) Demo checklist
- ✅ Output is valid JSON (no markdown wrappers).
- ✅ Agent responses appear in the UI.
- ✅ George verdict changes UI state.
- ✅ Audio tone changes with stable vs. unstable logic.

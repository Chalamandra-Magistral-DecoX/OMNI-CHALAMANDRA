# Evaluation Metrics — OMNI-CHALAMANDRA

OMNI-CHALAMANDRA is evaluated across four cognitive and technical dimensions to ensure reasoning stability and mathematical honesty.

## 1. Geometric Stability Score (GSS)
*   **Definition:** Measures the deviation of the reasoning output from the deterministic cross-ratio invariant.
*   **Formula:** `GSS = 1 - (|Target_R - Observed_R| / Sensitivity)`
*   **Target:** > 0.95 (High Alignment)

## 2. Drift Detection Rate (DDR)
*   **Definition:** The frequency at which the Shadow Orchestrator (GEORGE) correctly identifies cognitive hallucinations or logical contradictions.
*   **Validation:** Verified against known "stress test" geometric configurations (e.g., Degenerate Linear).

## 3. Cognitive Coherence Index (CCI)
*   **Definition:** Measures the thematic alignment between the 5 specialized agents.
*   **Metric:** High CCI indicates a consensus-driven strategy; Low CCI triggers a "Fractured" state in the UI.

## 4. Hallucination Risk Classification
*   **STABLE:** George verdict < 0.2 drift.
*   **WARNING:** 0.2 - 0.7 drift.
*   **PANIC:** > 0.7 drift; system triggers glitch feedback.

## 5. System Latency (Inference vs. Audit)
*   **Metric:** Time taken for the full debate loop.
*   **Benchmark:** < 5s for real-time strategic decision support.

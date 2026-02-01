# Reasoning Flow

OMNI-CHALAMANDRA follows a strictly ordered reasoning pipeline.

## Step-by-Step Flow

1. Input acquisition  
   The user provides geometric input and seed data.

2. Invariant validation  
   The cross-ratio is validated and frozen.

3. Multi-agent debate  
   Five agents analyze the invariant from distinct domains.
   No agent has authority over the final output.

4. Shadow audit (George)  
   George reviews all agent outputs and evaluates:
   - Practical viability
   - Internal contradictions
   - Hallucination risk

5. Decision gating  
   If risk exceeds thresholds, panic or glitch protocols activate.

6. Structured output  
   A deterministic JSON payload is produced.

7. Rendering and feedback  
   Canvas, audio, and visual engines react to the payload.
   No feedback engine alters reasoning.

8. Export  
   The final JSON is downloadable and reusable.

## Key Property

At no point does the system “think backward”.
Each stage consumes output from the previous one.

This linearity is intentional and judge-friendly.

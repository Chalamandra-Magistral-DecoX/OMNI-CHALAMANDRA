# OMNI-CHALAMANDRA — SAFETY & RELIABILITY NOTES

## Overview

OMNI-CHALAMANDRA is a structured reasoning system designed for
demonstration, not autonomous decision-making.

Its safety model prioritizes:
- Determinism over creativity
- Verification over speculation
- Auditability over persuasion

---

## Anti-Hallucination Design

The system actively prevents hallucinations through:

1. *Pre-computed Math*
   - All numeric values are calculated externally.
   - The model is forbidden from recomputing equations.

2. *Schema Enforcement*
   - Outputs must conform to a strict JSON schema.
   - Invalid outputs are rejected before rendering.

3. *Multi-Agent Constraint*
   - Each agent is limited to a fixed domain.
   - Cross-domain speculation is discouraged.

4. *Shadow Auditor (George)*
   - An external agent reviews all reasoning.
   - Flags optimism, abstraction, or incoherence.
   - Can trigger panic/glitch mode.

---

## Panic & Glitch Mode

If instability is detected:
- The system reduces claims.
- Visual/audio feedback signals uncertainty.
- Human intervention is recommended.

This prevents silent failure or misleading confidence.

---

## Intended Use

✔ Concept exploration  
✔ Pattern interpretation  
✔ Hackathon demonstration  
✔ Human-in-the-loop reasoning  

✖ Medical decisions  
✖ Legal judgments  
✖ Autonomous control  
✖ Unsupervised deployment  

---

## Judge Transparency

All components are:
- Observable
- Explainable
- Reproducible

No hidden reasoning layers exist beyond what is shown
in the debate and final JSON output.

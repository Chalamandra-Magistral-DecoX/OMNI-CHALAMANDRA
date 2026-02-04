# OMNI-CHALAMANDRA — Invariant Math Specification

This document defines the non-negotiable mathematical constants that protect the system against AI hallucination.

## Core Invariant: The Cross-Ratio ($R$)
The system is anchored by the projective geometry invariant $R$. Given four collinear points $A, B, C, D$:

$$R = \frac{(AC / BC)}{(AD / BD)}$$

### Why the Cross-Ratio?
* *Projective Invariance:* Perspective, scale, and rotation independent.
* *Determinism:* $R$ is computed once externally; agents are forbidden from re-interpreting the numeric value.

## Derived Constants (External Calculation)
The following values are treated as *Immutable Constants* within the Gemini 3 context:
* *Resonant Frequency:* Mapped to $R$ for acoustic stability.
* *Stability Score (0–1):* Derived from the geometric tension of the input.

## Interpretation Guidelines
While agents interpret meaning, they must align with these mathematical boundaries:
* *$R \approx 1.618$:* Harmonic coherence (Philosophical focus).
* *$1.0 < R < 1.618$:* Stable tension (Scientific focus).
* *$R < 0.618$:* Perceptual collapse risk (George Panic Trigger threshold).

## Audit Safety Protocol
1.  *Immutability:* Inputs cannot be altered by the LLM.
2.  *Structured JSON:* Outputs must follow a schema that matches the initial Math Engine signals.
3.  *Reproducibility:* The same $R$ will always produce the same audit constraints from GEORGE

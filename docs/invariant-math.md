# OMNI-CHALAMANDRA — Invariant Math Specification

## Purpose
This document defines the non-negotiable mathematical invariants used by the
OMNI-CHALAMANDRA system. These invariants ensure determinism, auditability, and
protection against hallucinated computation.

This file is READ-ONLY by design logic.

---

## Core Invariant: Cross-Ratio (R)

The system relies on the projective geometry invariant known as the cross-ratio.

R = (AC / BC) ÷ (AD / BD)

Where A, B, C, D are four colinear points extracted from visual input.

### Why Cross-Ratio?
- Projectively invariant (camera, perspective, scale independent)
- Stable under transformation
- Historically used in vision science, architecture, and perception theory

---

## Deterministic Rule

- Cross-ratio is COMPUTED ONCE
- AI agents MUST NOT recalculate or reinterpret R
- All reasoning derives from the provided value

Any attempt to recompute R is considered a hallucination.

---

## Derived Signals (Pre-Computed)

The following values are injected into the system and treated as constants:

- Resonant Frequency (Hz)
- Coordination Index (0–1)
- Stability Score (0–1)
- Geometry Category

These values are calculated externally (math engine / preprocessing layer),
not by the language model.

---

## Interpretation Ranges (Guideline Only)

- R ≈ 1.618 → Harmonic coherence
- 1.0 < R < 1.618 → Stable with internal tension
- 0.618 < R ≤ 1.0 → Perceptual compression
- R < 0.618 → Collapse risk
- R > 2.0 → Disruptive expansion
- R < 0 → Paradigm inversion

These ranges guide interpretation but do NOT alter numeric values.

---

## Audit Safety

Because:
- Inputs are immutable
- Math is external
- Outputs are structured JSON

The system is:
- Deterministic
- Reproducible
- Judge-safe
- Hallucination-resistant

This invariant layer is the backbone of OMNI-CHALAMANDRA.

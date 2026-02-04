# Technical Architecture

The OMNI-CHALAMANDRA pipeline ensures that AI reasoning is constrained by deterministic facts before reaching the user.

## Layer 1: The Invariant Engine (Input Processing)
* *Coordinate Mapping:* Translates user clicks into a geometric set.
* *Cross-Ratio Calculation:* Computers the projective invariant $R$.
* *Signal Normalization:* Prepares the mathematical context for the LLM.

## Layer 2: The Reasoning Core (Gemini 3)
* *Multi-Agent Debate:* Simulates a 5-way discussion (Scientist, Philosopher, Psychologist, Historian, Futurist).
* *Inference:* Gemini 3 analyzes the implications of the Cross-Ratio value.

## Layer 3: The Integrity & Feedback Layer
* *Shadow Audit (GEORGE):* A secondary agent validates the debate transcript against the initial math.
* *Panic Protocol:* If GEORGE detects a hallucination, it triggers a system-wide "Glitch" in the UI.
* *Rendering:* Stable results are rendered as SVG Mandalas and synthesized audio.

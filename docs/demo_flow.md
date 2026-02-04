# Live Demo Execution Flow

This document details the 8-step synchronous pipeline that powers the OMNI-CHALAMANDRA experience:

1.  *Input Capture:* User provides 4 spatial points to define the projective geometry.
2.  *Invariant Calculation:* The system derives the Cross-Ratio ($R$) as a ground-truth seed.
3.  *Agent Debate:* 5 specialized Gemini 3 agents analyze the implications of $R$.
4.  *Shadow Audit:* GEORGE evaluates the debate for hallucinations or mathematical drift.
5.  *Schema Validation:* High-speed JSON generation for system-wide orchestration.
6.  *Multimodal Trigger:* Concurrent activation of the Canvas (Visual) and WebAudio (Frequency).
7.  *Integrity Check:* Real-time "Panic/Glitch" trigger if the audit score fails.
8.  *Final Export:* Generation of an auditable JSON report for user download.

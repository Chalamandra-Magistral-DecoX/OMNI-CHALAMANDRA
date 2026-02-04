# OMNI-CHALAMANDRA — Reasoning Flow

This document defines the unidirectional pipeline of data, reasoning, and execution within the OMNI-CHALAMANDRA system to ensure zero redundancy and maximum auditability.

## High-Level Pipeline
*Input* → *Orchestrator* → *Multi-Agent Debate* → *GEORGE Audit* → *Payload* → *Execution*

---

## 1. Input & Mathematical Extraction
* *Sources:* Geometric extraction from canvas coordinates or image analysis.
* *Outputs:* Cross-ratio ($R$), mandala seed, and pre-computed signals.
* *Note:* No reasoning occurs here; this is purely deterministic data acquisition.

## 2. Orchestration Layer (app/orchestrator/flow.js)
* *Role:* Builds the system prompt and injects the invariant data ($R$).
* *Responsibility:* Enforces the debate structure and prevents agents from recalculating math.

## 3. The Consensus Team (5 Specialized Agents)
* *Agents:* Scientist (Neuro), Philosopher (Narrative), Psychologist (Healing), Historian (Techno), Futurist (Protocol).
* *Output:* Qualitative structured insights based strictly on the provided invariants.

## 4. Shadow Audit — GEORGE (app/agents/georgeAgent.js)
* *The 6th Agent:* An external auditor with no participation in the initial debate.
* *Authority:* Evaluates hallucination risk, abstraction, and real-world viability.
* *Signals:* Produces the "Panic Trigger" and "Glitch Intensity" scores.

## 5. Main Execution (app/main.js)
* *Execution vs Reasoning:* main.js does NOT think; it executes the JSON payload.
* *Controllers:* Triggers the Audio, Visual, and Glitch engines based on validated data.

---

### Key Distinctions
| Reasoning | Execution |
| :--- | :--- |
| *Orchestrator:* Builds the logic | *Main:* Drives the UI |
| *Agents:* Interpret the data | *Feedback Engines:* Render the signals |
| *George:* Audits the truth | *Glitch Engine:* Visualizes the error |

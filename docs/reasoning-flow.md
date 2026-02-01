# OMNI-CHALAMANDRA — Reasoning Flow

## Objective
This document explains how data, reasoning, and execution flow through the
OMNI-CHALAMANDRA system without redundancy or ambiguity.

---

## High-Level Flow

Input → Orchestrator → Agents → George Audit → Payload → Main → Feedback

---

## Step-by-Step Breakdown

### 1. Input Layer
Sources:
- Image analysis
- Geometric extraction
- External math engine

Produces:
- Cross-ratio (R)
- Mandala seed
- Pre-computed signals
- Hash chain context

No reasoning occurs here.

---

### 2. Orchestrator (app/orchestrator.js)
Role:
- Builds the system prompt
- Injects invariant data
- Defines debate structure

Responsibilities:
- Enforce agent order
- Enforce rules
- Ensure no recalculation

The orchestrator THINKS.
It does NOT render or play anything.

---

### 3. Agents (5 Internal Agents)

Agents:
1. Scientist (Neuro)
2. Philosopher (Narrative)
3. Psychologist (Healing)
4. Historian (Techno)
5. Futurist (Protocol)

Rules:
- Each agent speaks once
- May disagree
- Must use provided values only

Output:
- Structured qualitative insights

---

### 4. Shadow Audit — George (app/agents/GeorgeAgent.js)

George is the SIXTH agent.

Role:
- External auditor
- Not part of the debate
- Final authority

George evaluates:
- Over-optimism
- Abstraction
- Real-world viability
- Hallucination risk

George produces:
- Street viability verdict
- Glitch intensity
- Panic trigger
- Final one-line judgment

George closes reasoning.

---

### 5. Payload Assembly
All outputs are assembled into a single deterministic JSON payload.

This payload is:
- Downloadable
- Executable
- Demo-ready

No further reasoning occurs after this step.

---

### 6. Main Execution (app/main.js)
Main is NOT the orchestrator.

Main:
- Consumes the payload
- Triggers systems

Main calls:
- Audio Engine (frequency)
- Visual Engine (mandala)
- Glitch Engine (if panic)

Main EXECUTES.
It does not think.

---

### 7. Feedback Engines (app/feedback/)

Engines:
- AudioEngine.js → plays frequency
- VisualEngine.js → applies visual modulation
- GlitchEngine.js → triggers distortion

These engines react ONLY to payload values.

---

## Key Distinctions (Important)

- Orchestrator ≠ Main
- Reasoning ≠ Execution
- Agents ≠ George
- Math ≠ Interpretation

# System Architecture

OMNI-CHALAMANDRA follows a strict separation of concerns.

## Core Layers
1. Reasoning Layer (Agents + George)
2. Orchestration Layer
3. Canvas Rendering Layer
4. Feedback Layer (Audio / Visual / Glitch)
5. Export Layer

## Design Principles
- No agent performs rendering
- No renderer performs reasoning
- No feedback engine decides logic
- All execution is orchestrated centrally

This architecture ensures stability, testability, and judge-facing clarity.

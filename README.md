# OMNI-CHALAMANDRA
Multi-Agent Verifiable Intelligence System powered by Gemini 3

OMNI-CHALAMANDRA is an orchestration framework that coordinates specialized AI agents to reason, validate, and synthesize reliable outputs while explicitly surfacing uncertainty.

## Core Pipeline

User Input → Orchestrator → Specialized Agents → Verification Layer → Final Output + Confidence

## Agent Roles

George (Analytical Agent)
• Deep problem decomposition
• Structured reasoning
• Logic consistency checks

Strategist Agent
• Solution planning
• Decision path generation

Verifier Agent
• Cross-checking results
• Hallucination detection
• Confidence scoring

Synthesizer Agent
• Coherent final responses

Orchestrator
• Controls agent flow
• Enforces verification loops

## Architecture Flow Diagram

User
  ↓
Orchestrator
  ↓
George → Strategist → Verifier → Synthesizer
  ↓
Validated Output + Confidence Score

## Gemini 3 Integration

Each agent operates using role-specific system instructions configured in /ai-studio.

## Evaluation Metrics

### Quantitative
• Verification pass rate
• Reasoning consistency score
• Hallucination reduction %
• Confidence calibration accuracy

### Qualitative
• Clarity of reasoning
• Transparency of uncertainty
• Decision reliability
• User trust perception

## Why It Matters

Traditional LLM pipelines treat intelligence as a single black box.

OMNI-CHALAMANDRA distributes cognition across agents and makes reliability measurable.

## Local Setup

git clone https://github.com/Chalamandra-Magistral-DecoX/OMNI-CHALAMANDRA.git
cd OMNI-CHALAMANDRA
npm install

Create .env:

GEMINI_API_KEY=your_key_here

Run:

npm start

## Hackathon Objective

Demonstrate scalable, verifiable, multi-agent intelligence powered by Gemini 3.

## Creator

Chalamandra Magistral DecoX







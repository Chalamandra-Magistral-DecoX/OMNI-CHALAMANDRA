# OMNI-CHALAMANDRA | 🦎 Neuro-Symbolic Reasoning Engine

**A verifiable AI system that anchors Gemini 3 Pro's generative reasoning to deterministic geometric invariants.**


OMNI-CHALAMANDRA addresses the "hallucination problem" in Large Language Models by grounding abstract reasoning in pure mathematics. It utilizes a *Multi-Agent Debate System* audited by a specialized Shadow Agent ("George") to ensure logical consistency.

---

## 🧠 The Architecture: "The Cognitive Fortress"

Unlike standard chatbots, this system operates through a strict pipeline where *Math is the Seed* and *AI is the Interpreter*.

### System Flow Diagram
```mermaid
graph TD
    A[User Input (4 Points)] -->|Calculate| B(Math Engine: Cross-Ratio R)
    B -->|Seed Data| C{Gemini 3 Pro Orchestrator}
    C -->|Debate| D[Tier 1: The 5 Agents Panel]
    D -->|Transcript| E[Tier 2: George Shadow Audit]
    E -->|Verdict| F{Is Logic Valid?}
    F -->|Yes: STABILIZED| G[Render Mandala & Harmony]
    F -->|No: PANIC MODE| H[Trigger Glitch & Dissonance]

👥 The Agent Protocol
The system is governed by a Dual-Layer Cognitive Architecture.
🛡️ Tier 2: The Governance Layer (Verification)
| Agent Name | Role | Function | Authority |
|---|---|---|---|
| GEORGE | Shadow Auditor | Validates agent insights against the mathematical anchor. Detects hallucinations and logic drift. | VETO POWER (Can trigger System Panic) |
🗣️ Tier 1: The Reasoning Panel (Exploration)
| Agent Name | Domain | Cognitive Focus |
|---|---|---|
| SCIENTIST | Neuro-Physics | Analyzes structural stability, bio-resonance, and entropy. |
| PHILOSOPHER | Ontology | Interprets symmetry through formal logic and ethical frameworks. |
| PSYCHOLOGIST | Perception | Maps geometric tension to Jungian archetypes and cognitive bias. |
| HISTORIAN | Cycles | Connects the pattern to ancient architecture and techno-cultural cycles. |
| FUTURIST | Protocol | Projects the geometry's impact on future digital systems. |
🎨 Multimodal Output & Feedback
The system validates its reasoning through real-time sensory feedback:
 * 💠 Procedural Mandala (Canvas): A dynamic geometric rendering. If George approves the logic, the Mandala is symmetrical and cyan/teal. If George triggers panic, the geometry fractures and turns red.
 * 🔊 Resonant Audio: The system synthesizes a specific frequency (Hz) derived from the Cross-Ratio.
   * Stable Logic: Pure Sine Wave (Harmony).
   * Unstable Logic: Sawtooth Wave (Dissonance/Glitch).
 * 📝 JSON Audit: A transparent log containing the "George Verdict," confidence scores, and justification for the decision.
🛠️ Technical Stack
 * Core Model: Gemini 3 Pro (via Google AI Studio).
 * Frontend: Vanilla JavaScript (ES6 Modules).
 * Graphics: HTML5 Canvas API (Procedural Geometry).
 * Sound: Web Audio API (Oscillator Synthesis).
 * Orchestration: Custom Neuro-Symbolic Pipeline.
🚀 Installation & Setup
 * Clone the Repository
   git clone [https://github.com/YOUR_USERNAME/OMNI-CHALAMANDRA.git](https://github.com/YOUR_USERNAME/OMNI-CHALAMANDRA.git)
cd OMNI-CHALAMANDRA

 * Configure API Key
   Create a file named secrets.js in app/config/:
   // app/config/secrets.js
export const GEMINI_API_KEY = "YOUR_GOOGLE_AI_STUDIO_KEY";

 * Run Locally
   Since this project uses ES6 Modules, you must serve it via a local server (e.g., Live Server in VS Code or Python).
   # Python Example
python3 -m http.server 8000

 * Launch
   Open http://localhost:8000 in your browser. Click 4 points on the canvas to initiate the reasoning engine.

📄 License
Distributed under the MIT License. See LICENSE for more information.
Built for the Gemini 3 Developer Competition. Powered by the Cognitive Fortress Protocol.

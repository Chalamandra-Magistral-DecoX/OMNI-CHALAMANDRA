# OMNI-CHALAMANDRA | Neuro-Symbolic Reasoning Engine

**A verifiable AI system that anchors Gemini 3 Pro's generative reasoning to deterministic geometric invariants.**

OMNI-CHALAMANDRA addresses the "hallucination problem" in Large Language Models by grounding abstract reasoning in pure mathematics. It utilizes a *Multi-Agent Debate System* audited by a specialized Shadow Agent ("George") to ensure logical consistency.

---

## 🧠 The Architecture: "The Cognitive Fortress"

Unlike standard chatbots, this system operates through a strict pipeline where *Math is the Seed* and *AI is the Interpreter*.

### System Flow
1. *User Input* (4 Points)
2. *Math Engine* (Calculates Cross-Ratio R)
3. *Gemini 3 Pro* (Orchestrates the Debate)
4. *George Audit* (Verifies Truth)
5. *Output* (Mandala & Audio)

---

## 👥 The Agent Protocol

The system is governed by a *Dual-Layer Cognitive Architecture*.

### TIER 2: The Governance Layer (Verification)
* *GEORGE (Shadow Auditor)*
  * *Role:* Validates agent insights against the mathematical anchor.
  * *Authority:* VETO POWER. If he detects hallucinations or logic drift, he triggers "Panic Mode."

### TIER 1: The Reasoning Panel (Exploration)
* *SCIENTIST (Neuro-Physics)*
  * *Focus:* Analyzes structural stability, bio-resonance, and entropy.
* *PHILOSOPHER (Ontology)*
  * *Focus:* Interprets symmetry through formal logic and ethical frameworks.
* *PSYCHOLOGIST (Perception)*
  * *Focus:* Maps geometric tension to Jungian archetypes and cognitive bias.
* *HISTORIAN (Cycles)*
  * *Focus:* Connects the pattern to ancient architecture and techno-cultural cycles.
* *FUTURIST (Protocol)*
  * *Focus:* Projects the geometry's impact on future digital systems.

---

## 🎨 Multimodal Output & Feedback

The system validates its reasoning through real-time sensory feedback:

1. *Procedural Mandala (Canvas):* A dynamic geometric rendering. If George approves the logic, the Mandala is symmetrical and cyan/teal. If George triggers panic, the geometry fractures and turns red.

2. *Resonant Audio:* The system synthesizes a specific frequency (Hz) derived from the Cross-Ratio.
   * Stable Logic: Pure Sine Wave (Harmony).
   * Unstable Logic: Sawtooth Wave (Dissonance/Glitch).

3. *JSON Audit:* A transparent log containing the "George Verdict," confidence scores, and justification for the decision.

---

## 🛠️ Technical Stack

* *Core Model:* Gemini 3 Pro (via Google AI Studio).
* *Frontend:* Vanilla JavaScript (ES6 Modules).
* *Graphics:* HTML5 Canvas API (Procedural Geometry).
* *Sound:* Web Audio API (Oscillator Synthesis).
* *Orchestration:* Custom Neuro-Symbolic Pipeline.

---

## 🚀 Installation & Setup

1. *Clone the Repository*
   ```bash
   git clone https://github.com/YOUR_USERNAME/OMNI-CHALAMANDRA.git
   cd OMNI-CHALAMANDRA
   ```

2. *Add your Gemini key (local only)*
   - **Option A (recommended for local prototype):** set a runtime key in the browser console:
     ```js
     localStorage.setItem("OMNI_GEMINI_API_KEY", "YOUR_KEY_HERE");
     ```
   - **Option B:** add an inline config before `app/main.js`:
     ```html
     <script>
       window.OMNI_CONFIG = { GOOGLE_API_KEY: "YOUR_KEY_HERE" };
     </script>
     ```

3. *Run a local server*
   ```bash
   cd app
   python -m http.server 8080
   ```
   Then open `http://localhost:8080`.

---

## ✅ Hackathon Readiness

For a complete submission checklist, security notes, and a step-by-step AI Studio prototype guide, see:

- `docs/ai-studio-prototype.md`
- `docs/security-gemini-api.md`
- `docs/hackathon_alignment.md`

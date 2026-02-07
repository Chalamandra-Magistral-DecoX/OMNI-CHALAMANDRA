# 🧬 OMNI-CHALAMANDRA  
**Lead Developer:** Dana Michelle Vargas
**Brasdefer — Chalamandra Magistral**
**Project Initiative:** DecoX

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Model](https://img.shields.io/badge/engine-Gemini_1.5_Pro-blue)
![Audit](https://img.shields.io/badge/audit-George_Active-orange)

### Verifiable Multi-Agent Reasoning System for Strategic Decisions Under Uncertainty

OMNI-CHALAMANDRA is a structured multi-agent AI system built on Gemini that transforms high-uncertainty strategic decisions into transparent, verifiable, and actionable outcomes.

Instead of relying on single opaque model responses, the system exposes expert reasoning, quantified uncertainty, and independent auditing.

---

## 🚀 System Overview

OMNI-CHALAMANDRA is designed for high-stakes decision-making where AI hallucinations are unacceptable. It bridges the gap between generative reasoning and mathematical certainty through a multi-layered verification pipeline.

✔ **Visible Uncertainty:** Quantifies agent confidence and drift.
✔ **Anti-Hallucination:** Anchors generative output to projective geometry invariants.
✔ **Structured Governance:** Independent audit layer (GEORGE Protocol) validates all insights.
✔ **Multimodal Feedback:** Synthesizes results into visual mandalas, resonant audio, and structured JSON.

---

## 🧠 Runtime Architecture

```mermaid
flowchart TD
    subgraph Frontend [UI Layer: main.js]
        UI_IN[Canvas Click: 4 Points] --> ORCH[orchestrateOMNI]
    end

    subgraph Math [Geometric Invariant Layer]
        ORCH --> CR[crossRatio.js: Calculate R]
        ORCH --> COL[colinearityGuide.js: Analyze Alignment]
    end

    subgraph AI [Cognitive Agent Layer: geminiAgent.js]
        CR & COL --> GEM[Gemini 1.5 Pro Multi-Agent Debate]
        GEM --> AGENTS[Scientist | Philosopher | Psychologist | Historian | Futurist]
    end

    subgraph Audit [Shadow Governance: GeorgeAgent.js]
        AGENTS --> GEORGE[GEORGE Protocol Audit]
        CR --> GEORGE
    end

    subgraph Output [Multimodal Output Layer]
        GEORGE --> V{Verdict}
        V -->|STABLE| REND[CanvasController: Render Mandala]
        V -->|PANIC| GLITCH[glitchEngine.js: Trigger Feedback]
        REND --> AUDIO[audioEngine.js: Play Resonance]
        REND --> EXPORT[export.JSON.js: Generate Audit Trail]
    end
```

1.  **Deterministic Anchor:** Every session begins with the calculation of the **Cross Ratio (R)**, a projective geometry invariant.
2.  **Cognitive Council:** 5 specialized agents provide conflicting, domain-specific perspectives on the strategic input.
3.  **Shadow Governance:** The **GEORGE Protocol** audits the debate against the mathematical anchor to detect drift and hallucination.

---

## 👥 Agents & Roles

| Agent | Responsibility |
|------|---------------|
| Scientist | Technical feasibility & unknowns |
| Philosopher | Strategic framing & tradeoffs |
| Psychologist | Organizational & human impact |
| Historian | Real-world precedent analysis |
| Futurist | Long-term systemic risk |
| George (Auditor) | Detects instability & hallucination |

---

## 📊 Verifiability Metrics

Each decision generates:

• Agent confidence scores  
• Explicit unknowns  
• Hallucination likelihood  
• Stability score  
• Audit verdict  

Uncertainty is surfaced by design.

---

## 🛡️ Anti-Hallucination Philosophy

The system operates on a "Trust but Verify" model:
1.  **Mathematical Anchor:** All reasoning begins with the **Cross-Ratio (R)** and **Colinearity** analysis. These are deterministic values that cannot be hallucinated.
2.  **Schema Enforcement:** Gemini 1.5 Pro is forced to output structured JSON that aligns with the mathematical signals.
3.  **Shadow Governance:** The **GEORGE Protocol** acts as a deterministic auditor, comparing the AI's narrative against the geometric invariants. If the narrative drifts from the math, a **PANIC** state is triggered.
4.  **Cognitive Diversity:** 5 specialized agents provide contradictory perspectives, preventing single-model bias.

---

## 📦 JSON Output Schema

Every session generates a verifiable audit trail in JSON format:

```json
{
  "project": "OMNI-CHALAMANDRA",
  "geometry_input": {
    "points": [],
    "cross_ratio": 1.618,
    "geometry_category": "HARMONIC_GOLDEN"
  },
  "cognitive_signals": {
    "frequency_hz": 432,
    "coordination_index": 0.95
  },
  "agent_debate": {
    "scientist": "...",
    "philosopher": "..."
  },
  "shadow_audit": {
    "auditor": "GEORGE",
    "panic_triggered": false,
    "final_verdict": "..."
  },
  "chain_data": {
    "current_hash": "0x...",
    "iteration": 1
  }
}
```

---

## 🧩 Built With

• Gemini 3 Pro  
• TypeScript  
• Structured JSON schemas  
• Multi-agent orchestration  
• Uncertainty-aware UX  

---

## 🌍 Impact

Traditional AI systems hide uncertainty behind fluent language.

OMNI-CHALAMANDRA makes reasoning inspectable, measurable, and safer for real-world strategic decisions.

---

## 📈 Future Extensions

• Scenario comparison engine  
• Confidence evolution over time  
• Visual decision mandalas  
• Enterprise risk dashboards  

---

## 🛠️ Setup & Integration

1.  **Configure API Key:** Add your Gemini API key to `app/config/secrets.js`.
2.  **Serve Application:** Run a local server (e.g., `python3 -m http.server 3000 --directory app`).
3.  **Geometric Input:** Provide 4 points on the canvas to initiate the reasoning sequence.
4.  **Audit Export:** Use the automatic JSON export to retrieve the full reasoning trace.

---

### 🏆 Hackathon Focus

Demonstrating:

✔ Responsible AI  
✔ Multi-agent reasoning  
✔ Verifiable outputs  
✔ Real strategic workflows  

---

## 🧬 Authorship & Project Identity

*   **Lead Developer:** Dana Michelle Vargas
*   **Brasdefer — Chalamandra Magistral**
*   **Project Initiative:** DecoX


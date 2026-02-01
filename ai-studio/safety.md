# OMNI-CHALAMANDRA – Safety & Reliability Notes

## Scope
OMNI-CHALAMANDRA is a reasoning and visualization system.
It does NOT:
- Control external systems
- Execute autonomous actions
- Access private or real-world data

## Anti-Hallucination Design
- All numerical values are pre-computed
- Strict JSON schema enforcement
- External shadow auditor (George)
- Panic / glitch feedback instead of silent failure

## Agent Constraints
- Agents speak once per cycle
- No memory persistence between runs
- No self-modifying logic
- No tool invocation beyond declared modules

## User Safety
- Outputs are advisory and interpretative
- No medical, legal, or financial decisions are automated
- System prioritizes clarity over persuasion

## Audit Layer
George (Shadow Auditor) exists explicitly to:
- Detect optimism bias
- Flag incoherent reasoning
- Reduce hallucinated confidence

This project is designed for transparency, not autonomy.

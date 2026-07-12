---
type: design
tags: [mythic, ai, prompting, openai]
updated: 2026-07-12
status: active
---

# AI Oracle Prompting

The application leverages OpenAI's `gpt-4o-mini` model to serve as a virtual Game Master. It operates in two distinct execution paths: **Oracle Mode** (mechanical decision + storytelling) and **Flavored Narrative Mode** (pure storytelling based on a frontend roll).

---

## 🔮 1. Oracle Mode (`isOracleQuery: true`)

When a player inputs a custom action/question and clicks the Oracle button, the LLM simulates the Fate rules and performs automated bookkeeping in one pass.

### Context Variables Passed
- `currentScene`: Title and purpose of the current scene.
- `sceneHistory`: Chronological card logs of what happened in previous scenes.
- `characters`: The active list of NPCs, alliances, and statuses.
- `threads`: Active quests and priority values.
- `selectedOdds`: The string odds (e.g. "Likely").
- `chaosFactor`: The current Chaos Factor integer (1–9).
- `selectedWikiFiles`: Transcribed world-lore details from the `second-brain` wiki.

### Prompting Strategy
The system prompt instructs the AI to evaluate the query using the Chaos Factor and the selected Odds, decide on an answer (Yes/No/Exceptional Yes/Exceptional No), check for Random Events, and output a structured JSON object.

#### JSON Target Schema
```json
{
  "outcome": "Yes" | "No" | "Exceptional Yes" | "Exceptional No",
  "randomEvent": "None" | "Remote event" | "Introduce a new NPC" | "NPC Action" | "Move toward a thread" | "Move away from a thread" | "Close a thread" | "PC negative" | "PC positive" | "Ambiguous event",
  "keywords": "Action + Subject (e.g. Attainment + Goals)" | null,
  "narrative": "Story prose...",
  "chaosFactorAdjustment": 1 | -1 | 0,
  "newNPCs": [ { "name": "NPC Name", "relation": "Ally", "description": "Short bio..." } ] | null,
  "newThreads": [ { "title": "Quest Title", "priority": "Medium", "description": "Details..." } ] | null,
  "sceneUpdate": { "status": "Unmodified", "summary": "Scene summary..." } | null
}
```

---

## ✍️ 2. Flavored Narrative Mode (`isOracleQuery: false`)

When a player clicks a roll button in the frontend (such as Fate Chart or Scene Start), the app rolls a random value locally, resolves the outcome mechanically, and calls the API to generate narrative prose.

### Prompting Strategy
The system prompt is focused entirely on sensory-rich, atmospheric storytelling. 
- **Strict Constraint:** The AI is forbidden from mentioning any game mechanics in the generated narrative (e.g., must never output terms like *"dice roll"*, *"Fate Chart"*, *"threshold"*, or *"chaos factor"*).
- **Format:** Outputs 1–3 descriptive paragraphs.

---

## 💡 Prompt Optimization Insights

### 1. Strengths
- **Low Overhead Bookkeeping:** By returning new NPCs, threads, and scene updates in JSON, the AI handles the administrative bookkeeping that players often forget or find tedious.
- **Deep Context Immersion:** Including the active characters and threads ensures the narrative outcomes feel personally relevant to the campaign, avoiding generic responses.

### 2. Limitations
- **Resolution Bias in Oracle Mode:** In `isOracleQuery: true` mode, the LLM simulates the Fate Chart under the hood rather than parsing a true random seed. LLMs are notoriously biased toward "Yes" answers and dramatic outcomes, which can skew the game balance.
- **Proposed Optimization:** Modify the UI to always roll the dice on the client-side (Fate Chart or Fate Check), resolve the mathematical outcome, and then call the API in *Flavored Narrative Mode* to write the story consequence. This preserves true mathematical fairness while maintaining high-quality prose.

---

## 🔗 Connections
- [[index]] — Knowledge base map.
- [[app-architecture]] — Component and state mappings.
- [[meaning-tables]] — Parsing evocative keywords.

# Mythic GM KB Schema (The Rules)

This schema governs the developer knowledge base located in `kb/`. It ensures a clean, interlinked, and accurate representation of both the Mythic GME 2e ruleset and the Next.js app implementation.

## Layers
1. **`kb/raw/`**: The landing zone for raw resources (PDF rulebook, screenshots, wireframes, conversation logs).
2. **`kb/wiki/`**: The permanent memory. Typed, interlinked Markdown notes.
3. **`kb/index.md`**: The map of all notes.
4. **`kb/log.md`**: Chronological record of KB ingest/compile actions.
5. **`CLAUDE.md` / `AGENTS.md`**: General agent instructions.

## Workflow: Compile & Flush
1. **Ingest** raw sources (like PDF rulebook sections or conversation logs) into `kb/raw/`.
2. **Classify** content into targeted wiki pages using the taxonomy below.
3. **Merge** with an additive-only policy—never delete existing content, and format updates cleanly.
4. **Flush** raw files once they are fully represented in the wiki.

## Page Taxonomy

Every page in `kb/wiki/` must belong to exactly one category:

| Category | Description | Examples |
|----------|-------------|---------|
| `rule` | Mythic GME 2e mechanics | `fate-questions.md`, `scenes.md`, `chaos-factor.md` |
| `table` | Rules tables and charts | `random-event-focus-table.md`, `meaning-tables.md` |
| `design` | App implementation specs and details | `oracle-ai-integration.md`, `scene-journal-schema.md` |
| `system` | KB meta pages | `schema.md`, `index.md`, `log.md` |

## YAML Frontmatter Spec

Every page in `kb/wiki/` MUST start with this YAML block:

```yaml
---
type: rule | table | design | system
tags: [tag1, tag2]
updated: YYYY-MM-DD
# type-specific optional fields:
# rule:        chapter: <chapter number/name>
# table:       source_page: <PDF page number>
# design:      status: planned | active | complete
---
```

## Filename Convention
- Lowercase-kebab-case for all files (e.g. `fate-questions.md`).
- Files must be stored directly in `kb/wiki/`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mythic GM Developer Instructions

You are the developer agent for the **Mythic GM Emulator (AI Upgrade)** app.

## 📖 Mandatory Initialization
**Always read `kb/schema.md` and `kb/index.md` at the start of every session, before responding to the user.** This ensures you align with the developer knowledge base conventions, rulebook mechanics, and app-specific logic before making changes or answering questions.

## 🏗️ Developer KB Rules
1. **Source of Truth:** The developer knowledge base under `kb/` is your source of truth for the Mythic GME 2e rules and application implementation decisions. Consult it before searching the internet.
2. **Kebab-Case Convention:** All wiki pages must be named in lowercase-kebab-case (e.g. `fate-questions.md`) and placed inside `kb/wiki/`.
3. **Log Actions:** Every compilation or ingest action must be logged in [kb/log.md](file:///Users/danielcallaghan/Stash/mythic_gm/kb/log.md).

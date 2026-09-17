# Mythic GM KB Log (The Diary)

Chronological record of all updates, ingests, and compilations in this developer knowledge base.

## [2026-07-12 12:05] setup & compile | Initialized Developer KB & Ingested GME 2e Rulebook
- **Created KB Infrastructure:** Formulated the `kb/schema.md` taxonomy and structural rules, created the `kb/index.md` map, and initialized the folders.
- **Moved Rulebook PDF:** Transferred and renamed `pdfcoffee.com_mythic-game-master-emulator-2nd-edition-tana-pigeon-2-pdf-free.pdf` to `kb/raw/mythic-gme-2e.pdf`.
- **Ingested Rulebook Chapters (Pages 8-192):** Compiled detailed rule pages:
  - Created [[rules-summary]] — General quick reference.
  - Created [[fate-questions]] — Resolution via Fate Chart / Fate Check.
  - Created [[chaos-factor]] — CF mechanics and Low/Mid/No variations.
  - Created [[random-events]] — Step-by-step event generation and Focus tables.
  - Created [[scenes]] — Scene loops, Expected testing, and Scene Adjustment.
  - Created [[npc-behavior]] — Expectations vs Fate Questions for NPCs and behavior table.
  - Created [[variations]] — Thread Progress Tracks, Keyed Scenes, Prepared Adventures, and Peril Points.
  - Created [[meaning-tables]] — Word prompts, current code constants, and GME 2eElement Table extensions.
- **Created Technical Design Pages:**
  - Created [[app-architecture]] — SPA layout, persistence details, and logic bugs identified.
  - Created [[ai-oracle-prompting]] — Prompting specifications and output schemas.

## [2026-09-17 20:45] ui & ux upgrade | Scene/Character/Thread Cards, Modals, FOUC Fix & Responsiveness
- **Card UI & Modal Editing:**
  - Replaced cramped inline textboxes with dedicated interactive cards for Scenes, Characters, and Threads.
  - Added an integrated `#item-modal` dialog providing generous typing space with a title field and large textarea.
  - Enabled editing by clicking existing cards, with direct delete buttons on cards and modal.
  - Maintained synchronization with `npcArray` and `threadArray` so Oracle event focus generation continues seamlessly.
- **Background Flash Fix & Fade-In:**
  - Sampled exact parchment color (`#a37e57`) and applied it to `html` to eliminate the white screen flash on load.
  - Implemented `#bg-overlay` with image preloading and CSS opacity transition (`0.8s ease-in-out`) for a cinematic fade-in when `background.jpg` finishes loading.
  - Corrected how-to modal close handler to reset body background to stylesheet default instead of `"initial"`.
- **Responsiveness Overhaul:**
  - Enhanced layout across desktop, tablet (`<= 870px`), mobile (`<= 700px`, `<= 500px`, `<= 375px`), and landscape mode.
  - Replaced nested percentage heights on mobile lists with clean vertical stacking and single smooth scroll container.
  - Ensured scene cards never overlap the "Add Scene" bottom row by linking container height to `#emulator-window`.
  - Scaled tab buttons and typography gracefully on small screens without illegible micro-fonts.

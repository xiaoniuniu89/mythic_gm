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

## [2026-09-18 16:30] feature | Electron Desktop App & Multi-Session Persistent SQLite Database
- **Electron Desktop Conversion:**
  - Configured Electron shell (`electron/main.js`, `electron/preload.js`) with native menus and shortcuts (`CmdOrCtrl+O` for Saved Adventures, `CmdOrCtrl+N` for New Adventure).
  - Packaged via `electron-builder` with multi-platform targets for macOS (`dmg`, `zip`), Windows (`nsis`, `portable`), and Linux (`AppImage`, `deb`).
  - Added npm scripts: `npm run desktop` (`npm start`), `npm run desktop:pack`, `npm run desktop:build`, and `npm run serve`.
- **Zero-Auth Local Persistence:**
  - Implemented persistent SQLite database manager (`electron/database.js`) using WebAssembly-based `sql.js` (eliminates C++ compilation/node-gyp issues across platforms).
  - SQLite database file stored at `<userData>/mythic_gm.sqlite` with an automatic JSON mirror at `<userData>/mythic_games_backup.json`.
  - Isomorphic `GameStore` adapter routes seamlessly to Electron IPC when in desktop mode and transparently falls back to `localStorage` in browser mode.
- **Multi-Session Adventures UI:**
  - Added top navigation bar with `#active-game-pill` showing current adventure name and quick-access `#games-menu-btn`.
  - Created `#games-modal` providing an on-load adventure picker with title input, dynamic adventure cards, stats badges (Chaos, Scenes, Characters, Threads, timestamps), rename, and delete actions.
  - Enabled real-time auto-saving on any state mutation (chaos changes, card additions, edits, deletions).
  - Implemented offline JSON Backup and Restore features for easy portability.

## [2026-09-18 22:40] ux improvement | Inline Adventure Rename & Clean Zero-Adventures Empty State
- **Inline Card Title Editing:**
  - Replaced native `prompt()` dialogs (which fail in Electron) with an inline edit field inside each adventure card.
  - Supports Enter to save, Escape or cancel button to dismiss, and auto-selects text on open.
- **Zero-Adventures Empty State:**
  - Removed auto-creation of dummy fallback adventure ("New Adventure") when all adventures are deleted.
  - Added clean `.empty-adventures-box` prompting user to enter a new adventure title, with automatic input focus.
  - `clearActiveGameState()` cleanly resets the active adventure indicator to "No Adventure".

## [2026-09-18 22:45] ux improvement | Mandatory Adventure Enforcement (Modal Lock)
- **Modal Close Prevention:**
  - Disallowed closing `#games-modal` when `currentActiveGame === null`.
  - Hides close buttons (`#close-games-modal` & `#close-games-modal-btn`) when no adventure is active.
  - Backdrop clicks and `Escape` key are intercepted and redirected to focusing `#new-game-input`.
  - Added `#no-adventure-notice` warning banner indicating an adventure must be loaded or created to begin playing.




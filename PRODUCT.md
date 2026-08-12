# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Solo tabletop role-players and game masters using Mythic to run an emergent campaign. They need to move quickly between oracle results and campaign notes without breaking the flow of play.

## Product Purpose

Mythic GM is a browser-based Mythic GME companion. It keeps campaign material, scenes, characters, and threads together while providing the core oracle tools needed during a session.

## Positioning

The product turns Mythic's oracle, campaign lists, and session notes into a single campaign workspace rather than a collection of disconnected dice tables and documents.

## Operating Context

The primary workflow is choosing or creating a campaign, then using the Oracle, Scenes, and Codex while playing. Campaign data needs to remain available when the user returns to the same browser.

## Capabilities and Constraints

- Campaign selection and local persistence are required.
- Notes for scenes, characters, and threads should support rich text.
- The existing static HTML, CSS, and JavaScript implementation is the active implementation.
- AI-assisted features are explicitly out of scope while they remain a work in progress.

## Brand Commitments

The existing product uses a dark-fantasy, parchment-and-ink visual language and calls its central probability tool the Oracle.

## Evidence on Hand

- Current static product: `index.html`, `assets/css/style.css`, and `assets/js/script.js`.
- Existing parchment asset: `assets/images/background.jpg`.
- Mythic mechanics reference: `kb/wiki/`.

## Product Principles

1. Campaign context must be immediately visible and safely persistent.
2. Notes should be expressive enough for real play, without becoming a word processor.
3. The oracle remains fast and unobtrusive during a live session.
4. Preserve the product's dark-fantasy identity while making the interface clearer and more dependable.

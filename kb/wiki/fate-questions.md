---
type: rule
tags: [mythic, gme, rules, fate-questions]
updated: 2026-07-12
chapter: Fate Questions
---

# Fate Questions

**Fate Questions** are the primary mechanism in Mythic GME 2nd Edition to resolve uncertainty, test expectations, and discover details about the adventure. A Fate Question must always be framed as a binary **Yes/No Question**.

---

## 🎲 Core Mechanics

There are two methods to resolve a Fate Question: the **Fate Chart (1d100)** and the **Fate Check (2d10)**.

### 1. Assigning Odds
Before rolling, the player assigns the probability of a "Yes" answer based on the current context:
1.  **Certain**
2.  **Nearly Certain**
3.  **Very Likely**
4.  **Likely**
5.  **50/50**
6.  **Unlikely**
7.  **Very Unlikely**
8.  **Nearly Impossible**
9.  **Impossible**

---

## 📊 Method A: The Fate Chart (1d100)

Roll a percentile die (1d100) and compare the result to the target numbers found in the Fate Chart under the current Chaos Factor (1–9).

### Fate Chart Target Thresholds

| Odds | CF 1 | CF 2 | CF 3 | CF 4 | CF 5 | CF 6 | CF 7 | CF 8 | CF 9 |
|---|---|---|---|---|---|---|---|---|---|
| **Certain** | 10 / 50 / 91 | 13 / 65 / 94 | 15 / 75 / 96 | 17 / 85 / 98 | 18 / 90 / 99 | 19 / 95 / 100 | 20 / 99 / X | 20 / 99 / X | 20 / 99 / X |
| **Nearly Certain** | 7 / 35 / 88 | 10 / 50 / 91 | 13 / 65 / 94 | 15 / 75 / 96 | 17 / 85 / 98 | 18 / 90 / 99 | 19 / 95 / 100 | 20 / 99 / X | 20 / 99 / X |
| **Very Likely** | 5 / 25 / 86 | 7 / 35 / 88 | 10 / 50 / 91 | 13 / 65 / 94 | 15 / 75 / 96 | 17 / 85 / 98 | 18 / 90 / 99 | 19 / 95 / 100 | 20 / 99 / X |
| **Likely** | 3 / 15 / 84 | 5 / 25 / 86 | 7 / 35 / 88 | 10 / 50 / 91 | 13 / 65 / 94 | 15 / 75 / 96 | 17 / 85 / 98 | 18 / 90 / 99 | 19 / 95 / 100 |
| **50/50** | 2 / 10 / 83 | 3 / 15 / 84 | 5 / 25 / 86 | 7 / 35 / 88 | 10 / 50 / 91 | 13 / 65 / 94 | 15 / 75 / 96 | 17 / 85 / 98 | 18 / 90 / 99 |
| **Unlikely** | 1 / 5 / 82 | 2 / 10 / 83 | 3 / 15 / 84 | 5 / 25 / 86 | 7 / 35 / 88 | 10 / 50 / 91 | 13 / 65 / 94 | 15 / 75 / 96 | 17 / 85 / 98 |
| **Very Unlikely** | X / 1 / 81 | 1 / 5 / 82 | 2 / 10 / 83 | 3 / 15 / 84 | 5 / 25 / 86 | 7 / 35 / 88 | 10 / 50 / 91 | 13 / 65 / 94 | 15 / 75 / 96 |
| **Nearly Impossible** | X / 1 / 81 | X / 1 / 81 | 1 / 5 / 82 | 2 / 10 / 83 | 3 / 15 / 84 | 5 / 25 / 86 | 7 / 35 / 88 | 10 / 50 / 91 | 13 / 65 / 94 |
| **Impossible** | X / 1 / 81 | X / 1 / 81 | X / 1 / 81 | 1 / 5 / 82 | 2 / 10 / 83 | 3 / 15 / 84 | 5 / 25 / 86 | 7 / 35 / 88 | 10 / 50 / 91 |

*Table format:* **`Exceptional Yes Threshold` / `Yes Threshold` / `Exceptional No Threshold`**
*   `X` indicates that the result is mathematically impossible.

### Roll Results (1d100)
- **Exceptional Yes:** Roll $\le$ Exceptional Yes Threshold.
- **Yes:** Roll $\le$ Yes Threshold.
- **No:** Roll $>$ Yes Threshold.
- **Exceptional No:** Roll $\ge$ Exceptional No Threshold.
- **Random Event:** Roll is a double-digit number (11, 22, 33, 44, 55, 66, 77, 88, 99) **and** the single-digit value (1–9) $\le$ current Chaos Factor.

---

## 🎲 Method B: The Fate Check (2d10)

Roll 2d10, sum the results, and apply modifiers for assigned Odds and the current Chaos Factor.

### Modifiers

| Odds | Modifier |
|---|---|
| Certain | +5 |
| Nearly Certain | +4 |
| Very Likely | +2 |
| Likely | +1 |
| 50/50 | +0 |
| Unlikely | -1 |
| Very Unlikely | -2 |
| Nearly Impossible | -4 |
| Impossible | -5 |

| Chaos Factor | Modifier |
|---|---|
| 9 | +5 |
| 8 | +4 |
| 7 | +2 |
| 6 | +1 |
| 5 | +0 |
| 4 | -1 |
| 3 | -2 |
| 2 | -4 |
| 1 | -5 |

### Roll Results (2d10)

> [!IMPORTANT]
> **Strict Range Rule for Exceptional Results**
> Unlike standard RPG checks, modifiers can push a total *beyond* the exceptional range. If the final modified roll is higher than 20 or lower than 2, the result is resolved as a normal Yes/No.

- **Exceptional Yes:** Modified Total must be exactly **18, 19, or 20** (18–20).
- **Yes:** Modified Total is **11 or more**.
- **No:** Modified Total is **10 or less**.
- **Exceptional No:** Modified Total must be exactly **2, 3, or 4** (2–4).
- **Random Event:** Both dice show the same value (doubles) **and** that single-digit value $\le$ current Chaos Factor.

---

## 🔗 Connections
- [[index]] — Knowledge base map.
- [[chaos-factor]] — Understanding Chaos scaling.
- [[random-events]] — Random event resolution details.

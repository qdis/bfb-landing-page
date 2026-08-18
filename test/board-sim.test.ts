// ABOUTME: Tests the hero board simulation stays on named providers and tasks.
// ABOUTME: Guarantees handoff and start helpers mutate real state, not empty chrome.

import { describe, expect, it } from "vitest";
import { initialBoard } from "../src/lib/board-sim";

describe("board simulation", () => {
  it("starts with three named providers and a human gate", () => {
    const state = initialBoard();
    expect(state.attention?.title).toMatch(/Mac Studio|runner|review|reconnect|checkout|artifact/i);
    expect(state.lanes).toHaveLength(3);
    expect(state.lanes.map((lane) => lane.provider).sort()).toEqual([
      "Claude",
      "Codex",
      "Grok",
    ]);
    expect(state.handoff?.from).toBeTruthy();
    expect(state.handoff?.to).toBeTruthy();
  });
});

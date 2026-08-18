// ABOUTME: Tests the scripted demo beats stay on real BFB work and named people.
// ABOUTME: Claude asks, Timo answers, Codex takes the review, Adina ships.

import { describe, expect, it } from "vitest";
import {
  QUESTION,
  TIMO_ANSWER,
  attention,
  boardSpend,
  formatClock,
  presence,
  snapshot,
  tickWorkingCard,
} from "../src/lib/demo-script";

describe("demo script", () => {
  it("opens on local MCP with Claude, Adina, and Grok on the board", () => {
    const state = snapshot(0);
    expect(state.cards.some((card) => card.pack === "A01" && card.owner === "Claude")).toBe(
      true,
    );
    expect(state.cards.some((card) => card.owner === "Adina" && card.pack === "L01")).toBe(
      true,
    );
    expect(state.cards.some((card) => card.owner === "Grok" && card.pack === "X03A")).toBe(
      true,
    );
    expect(state.cards.some((card) => card.pack === "E02" && card.activity === "waiting")).toBe(
      true,
    );
    expect(state.thread).toBeNull();
    expect(attention(state)).toBeNull();
  });

  it("blocks Claude on Timo with the MCP question", () => {
    const state = snapshot(1);
    const a01 = state.cards.find((card) => card.id === "a01");
    expect(a01?.activity).toBe("needs_human");
    expect(state.thread?.question).toBe(QUESTION);
    expect(state.waiting).toBe(true);
    expect(attention(state)?.to).toBe("Timo");
    expect(presence(state).find((item) => item.actor === "Timo")?.mode).toBe("needed");
    expect(presence(state).find((item) => item.actor === "Claude")?.mode).toBe("waiting");
  });

  it("hands the MCP review to Codex after Timo answers", () => {
    const answered = snapshot(2);
    expect(answered.thread?.answer).toBe(TIMO_ANSWER);
    const handed = snapshot(3);
    const a01 = handed.cards.find((card) => card.id === "a01");
    expect(a01?.owner).toBe("Codex");
    expect(a01?.previous).toBe("Claude");
    expect(a01?.activity).toBe("handoff");
    const e02 = handed.cards.find((card) => card.id === "e02");
    expect(e02?.owner).toBe("Claude");
    expect(e02?.activity).toBe("working");
  });

  it("lets Adina accept the CLI kernel on the last beat", () => {
    const state = snapshot(4);
    const cli = state.cards.find((card) => card.id === "l01");
    expect(cli?.activity).toBe("accepted");
    expect(cli?.owner).toBe("Adina");
    expect(state.cards.find((card) => card.id === "x03a")?.activity).toBe("reviewing");
  });

  it("tracks human time and agent time as two clocks", () => {
    const state = snapshot(0);
    const l01 = state.cards.find((card) => card.id === "l01");
    const a01 = state.cards.find((card) => card.id === "a01");
    expect(l01?.humanSeconds).toBeGreaterThan(l01?.agentSeconds ?? 0);
    expect(a01?.agentSeconds).toBeGreaterThan(0);
    expect(a01?.humanSeconds).toBe(0);
    const spent = boardSpend(state.cards);
    expect(spent.human).toBeGreaterThan(0);
    expect(spent.agent).toBeGreaterThan(0);
    expect(formatClock(412)).toBe("06:52");
    if (l01) {
      const before = l01.humanSeconds;
      tickWorkingCard(l01);
      expect(l01.humanSeconds).toBe(before + 1);
    }
    const answered = snapshot(2);
    expect(answered.cards.find((card) => card.id === "a01")?.humanSeconds).toBeGreaterThan(0);
  });

  it("wakes the hidden runner when the egg is set", () => {
    const state = snapshot(0, "runner");
    const wake = state.cards.find((card) => card.id === "wake");
    expect(wake?.pack).toBe("L08");
    expect(wake?.owner).toBe("Timo");
    expect(wake?.activity).toBe("needs_human");
  });
});

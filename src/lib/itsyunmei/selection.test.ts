import { describe, expect, it } from "vitest";
import {
  canSelect,
  revealIndexForPosition,
  resetSelection,
  selectPosition,
  unlockSelection,
} from "./selection";

describe("card selection", () => {
  it("assigns fronts 1, 2, 3 in selection order regardless of position", () => {
    // 1-based positions 6, 2, 4 → indices 5, 1, 3
    let state = resetSelection();
    state = selectPosition(state, 5);
    state = unlockSelection(state);
    state = selectPosition(state, 1);
    state = unlockSelection(state);
    state = selectPosition(state, 3);

    expect(state.selected).toEqual([5, 1, 3]);
    expect(revealIndexForPosition(state.selected, 5)).toBe(0);
    expect(revealIndexForPosition(state.selected, 1)).toBe(1);
    expect(revealIndexForPosition(state.selected, 3)).toBe(2);
  });

  it("ignores a tap on an already selected card", () => {
    let state = selectPosition(resetSelection(), 2);
    state = unlockSelection(state);
    const again = selectPosition(state, 2);
    expect(again.selected).toEqual([2]);
    expect(again).toBe(state);
  });

  it("never selects more than three cards", () => {
    let state = resetSelection();
    for (const pos of [0, 1, 2, 3]) {
      state = selectPosition(state, pos);
      state = unlockSelection(state);
    }
    expect(state.selected).toEqual([0, 1, 2]);
    expect(canSelect(state, 3)).toBe(false);
  });

  it("ignores rapid taps while locked", () => {
    let state = selectPosition(resetSelection(), 6);
    expect(state.locked).toBe(true);
    state = selectPosition(state, 0);
    state = selectPosition(state, 1);
    expect(state.selected).toEqual([6]);
  });

  it("keeps selected cards in their original positions", () => {
    let state = resetSelection();
    state = selectPosition(state, 4);
    state = unlockSelection(state);
    state = selectPosition(state, 0);
    expect(revealIndexForPosition(state.selected, 4)).toBe(0);
    expect(revealIndexForPosition(state.selected, 0)).toBe(1);
    expect(revealIndexForPosition(state.selected, 1)).toBeNull();
  });
});

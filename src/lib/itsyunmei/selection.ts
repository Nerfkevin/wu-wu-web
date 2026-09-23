import { MAX_SELECTIONS } from "./config";

export type CardSelectionState = {
  selected: number[];
  locked: boolean;
};

export function canSelect(
  state: CardSelectionState,
  position: number,
): boolean {
  return (
    !state.locked &&
    state.selected.length < MAX_SELECTIONS &&
    !state.selected.includes(position)
  );
}

export function selectPosition(
  state: CardSelectionState,
  position: number,
): CardSelectionState {
  if (!canSelect(state, position)) return state;
  return {
    selected: [...state.selected, position],
    locked: true,
  };
}

export function unlockSelection(
  state: CardSelectionState,
): CardSelectionState {
  if (!state.locked) return state;
  return { ...state, locked: false };
}

export function revealIndexForPosition(
  selected: number[],
  position: number,
): number | null {
  const idx = selected.indexOf(position);
  return idx === -1 ? null : idx;
}

export function resetSelection(): CardSelectionState {
  return { selected: [], locked: false };
}

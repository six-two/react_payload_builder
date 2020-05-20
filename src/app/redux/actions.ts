import { ListEntry, FormatState, State } from './store';

// action types
export const FORMAT_CHANGED = "FORMAT_CHANGED";
export const ENDIAN_TOGGLE = "ENDIAN_TOGGLE";
export const SET_LIST_ENTRIES = "SET_LIST_ENTRIES";
export const UPDATED_CLIPBORD_MANAGER = "UPDATED_CLIPBORD_MANAGER";
export const SET_STATE = "SET_STATE";

// action payloads
export interface SetListPayload {
  list: ListEntry[],
  nextId: number,
}

// actions
export interface ActionWithoutPayload {
  type: string,
}

export interface FormatChangeAction {
  type: string,
  payload: FormatState,
}

export interface SetListAction {
  type: string,
  payload: SetListPayload,
}

export interface SetStateAction {
  type: string,
  payload: State,
}

export type Action = ActionWithoutPayload | FormatChangeAction | SetListAction | SetStateAction;

// action creators
export function setFormat(format: FormatState): FormatChangeAction {
  return {
    type: FORMAT_CHANGED,
    payload: format,
  };
}

export function toggleEndian(): ActionWithoutPayload {
  return { type: ENDIAN_TOGGLE };
}

//TODO make multiple functions: onDelete(index), onSwap, onDeleteAll, etc
export function setListEntries(entries: ListEntry[], nextId: number): SetListAction {
  return { type: SET_LIST_ENTRIES, payload: { list: entries, nextId: nextId } };
}

export function updatedClipbordManager(): ActionWithoutPayload {
  return { type: UPDATED_CLIPBORD_MANAGER };
}

export function setState(newState: State): SetStateAction {
  return { type: SET_STATE, payload: newState };
}

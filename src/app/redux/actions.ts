import { ListEntry, FormatState, State } from './store';

// action types
export const FORMAT_CHANGED = "FORMAT_CHANGED";
export const ENDIAN_TOGGLE = "ENDIAN_TOGGLE";
export const SET_LIST_ENTRIES = "SET_LIST_ENTRIES";
export const SET_TEXT_TO_COPY = "SET_TEXT_TO_COPY";
export const SET_STATE = "SET_STATE";

// action payloads
export interface SetListPayload {
  list: ListEntry[],
  nextId: number,
}

// actions
export interface FormatChangeAction {
  type: string,
  payload: FormatState,
}

export interface EndianToggleAction {
  type: string,
}

export interface SetListAction {
  type: string,
  payload: SetListPayload,
}

export interface SetTextToCopyAction {
  type: string,
  payload: string,
}

export interface SetStateAction {
  type: string,
  payload: State,
}

export type Action = FormatChangeAction | EndianToggleAction | SetListAction | SetTextToCopyAction | SetStateAction;

// action creators
export function setFormat(format: FormatState): FormatChangeAction {
  return {
    type: FORMAT_CHANGED,
    payload: format,
  };
}

export function toggleEndian(): EndianToggleAction {
  return { type: ENDIAN_TOGGLE };
}

//TODO make multiple functions: onDelete(index), onSwap, onDeleteAll, etc
export function setListEntries(entries: ListEntry[], nextId: number): SetListAction {
  return { type: SET_LIST_ENTRIES, payload: { list: entries, nextId: nextId } };
}

export function setTextToCopy(text: string): SetTextToCopyAction {
  return { type: SET_TEXT_TO_COPY, payload: text };
}

export function setState(newState: State): SetStateAction {
  return { type: SET_STATE, payload: newState };
}

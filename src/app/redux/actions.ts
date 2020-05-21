import { ListEntry, FormatState, State } from './store';
import { AnyValues } from '../hex/ByteStringBuilder';


// action types
export const FORMAT_CHANGED = "FORMAT_CHANGED";
export const ENDIAN_TOGGLE = "ENDIAN_TOGGLE";
export const LIST_ADD = "LIST_ADD";
export const LIST_DELETE = "LIST_DELETE";
export const LIST_DELETE_ALL = "LIST_DELETE_ALL";
export const LIST_SWAP = "LIST_SWAP";
export const LIST_ITEM_UPDATE = "LIST_ITEM_UPDATE";
export const UPDATED_CLIPBORD_MANAGER = "UPDATED_CLIPBORD_MANAGER";
export const SET_STATE = "SET_STATE";

// action payloads
export interface ListItemChangePayload {
  index: number,
  newValue: AnyValues,
}

export interface ListSwapPayload {
  indexA: number,
  indexB: number,
}

// actions
export interface ActionWithoutPayload {
  type: string,
}

export interface FormatChangeAction {
  type: string,
  payload: FormatState,
}

export interface SetStateAction {
  type: string,
  payload: State,
}

export interface ListSwapAction {
  type: string,
  payload: ListSwapPayload,
}

export interface ListDeleteAction {
  type: string,
  payload: number,
}

export interface ListItemChangeAction {
  type: string,
  payload: ListItemChangePayload,
}

export type Action = ActionWithoutPayload | FormatChangeAction |
  SetStateAction | ListSwapAction | ListDeleteAction | ListItemChangeAction;

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


export function listItemAdd(): ActionWithoutPayload {
  return { type: LIST_ADD };
}

export function listItemDelete(index: number): ListDeleteAction {
  return { type: LIST_DELETE, payload: index };
}

export function listItemSwap(indexA: number, indexB: number): ListSwapAction {
  return { type: LIST_SWAP, payload: { indexA: indexA, indexB: indexB } };
}

export function listItemDeleteAll(): ActionWithoutPayload {
  return { type: LIST_DELETE_ALL };
}

export function listItemChanged(index: number, newValue: AnyValues): ListItemChangeAction {
  return { type: LIST_ITEM_UPDATE, payload: { index: index, newValue: newValue } };
}

export function updatedClipbordManager(): ActionWithoutPayload {
  return { type: UPDATED_CLIPBORD_MANAGER };
}

export function setState(newState: State): SetStateAction {
  return { type: SET_STATE, payload: newState };
}

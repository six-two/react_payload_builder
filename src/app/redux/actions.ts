// action types
export const FORMAT_CHANGED = "FORMAT_CHANGED";
export const ENDIAN_TOGGLE = "ENDIAN_TOGGLE";

// action payloads
export interface FormatChangePayload {
  formatName?: string,
  formatValue: string,
  customFormatValue?: string,
}

// actions
export interface FormatChangeAction {
  type: string,
  payload: FormatChangePayload,
}

export interface EndianToggleAction {
  type: string,
}

export type Action = FormatChangeAction | EndianToggleAction;

// action creators
export function formatTypeChanged(newFormatName: string, newFormatValue: string): FormatChangeAction {
  return {
    type: FORMAT_CHANGED,
    payload: { formatName: newFormatName, formatValue: newFormatValue },
  };
}

export function customFormatChanged(newCustomFormat: string): FormatChangeAction {
  // ASSERTION: this function is only called if the current formatName is the custom format name
  return {
    type: FORMAT_CHANGED,
    payload: { formatValue: newCustomFormat, customFormatValue: newCustomFormat },
  };
}

export function toggleEndian(): EndianToggleAction {
  return { type: ENDIAN_TOGGLE };
}

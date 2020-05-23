import { createStore } from 'redux';
import { reducer } from './reducer';
import { AnyValues, BuilderResult } from '../hex/ByteStringBuilder';
import { DEFAULT_FORMAT_STATE, parseFormatString } from '../views/output/FormatChooser';

export interface State {
  persistent: PersistentState,
  updateCounter: number,
  outputBuilderResult: BuilderResult,
  parsedFormat: ParsedFormat,
  hasErrors: boolean,
}

export interface PersistentState {
  isLittleEndian: boolean,
  format: FormatState,
  entries: ListState,
}

export interface ListState {
  list: ListEntry[],
  nextId: number,
}

export interface ListEntry {
  key: number,
  data: AnyValues,
}

export interface FormatState {
  selected: string,
  value: string,
  custom: string,
}

export interface ParsedFormat {
  errorMessage?: string,
  format: string,
  labels: string[],
}

export const fallbackState: State = {
  persistent: {
    isLittleEndian: true,
    format: DEFAULT_FORMAT_STATE,
    entries: {
      list: [],
      nextId: 0,
    },
  },
  updateCounter: 0,
  outputBuilderResult: {
    byteStrings: [],
  },
  parsedFormat: parseFormatString(DEFAULT_FORMAT_STATE.value),
  hasErrors: false,
}

let devTools = undefined;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  // Redux dev tools are available
  let devToolOptions = {
    trace: false,
    traceLimit: 25
  };
  devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__(devToolOptions);
}

export const store = createStore(reducer, fallbackState, devTools);

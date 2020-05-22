import { createStore } from 'redux';
import { reducer } from './reducer';
import { AnyValues } from '../hex/ByteStringBuilder';
import { DEFAULT_FORMAT_STATE } from '../views/hex/FormatChooser';

export interface State {
  persistent: PersistentState,
  updateCounter: number,
}

export interface PersistentState {
  isLittleEndian: boolean,
  format: FormatState,
  entries: {
    list: ListEntry[],
    nextId: number,
  },
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

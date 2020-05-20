import { createStore } from 'redux';
import { reducer } from './reducer';
import { AnyValues } from '../hex/ByteStringBuilder';

export var textToCopy: string = "";

export interface State {
  persistent: {
    isLittleEndian: boolean,
    format: FormatState,
    entries: {
      list: ListEntry[],
      nextId: number,
    },
  }
  copy: {
    text: string,
    inClipboard: string | null,
  }
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
    format: {
      selected: "raw",
      value: "%s",
      custom: "yourCommand --flags '%s'",
    },
    entries: {
      list: [],
      nextId: 0,
    },
  },
  copy: {
    text: "",
    inClipboard: null,
  }
}


const devTools: any = (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__(
  {trace: true, traceLimit: 25}
) : {};

export const store = createStore(reducer, fallbackState, devTools);

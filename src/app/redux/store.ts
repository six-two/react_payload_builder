import { createStore } from 'redux';
import { reducer } from './reducer';
import { AnyValues } from '../hex/ByteStringBuilder';
import { DEFAULT_FORMAT_STATE } from '../views/hex/FormatChooser';

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
  },
  clipboardManagerUpdateCounter: number,
  isExportSelected: boolean,
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
  copy: {
    text: "",
    inClipboard: null,
  },
  clipboardManagerUpdateCounter: 0,
  isExportSelected: false,
}


const devTools: any = (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__(
  { trace: true, traceLimit: 25 }
) : {};

export const store = createStore(reducer, fallbackState, devTools);

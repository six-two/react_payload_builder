import { createStore } from 'redux';
import { reducer } from './reducer';
import { AnyValues } from '../hex/ByteStringBuilder';


export interface State {
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
  isLittleEndian: true,
  format: {
    selected: "raw",
    value: "%s",
    custom: "yourCommand --flags '%s'",
  },
  entries: {
    list: [],
    nextId: 0,
  }
}


const devTools: any = (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : {};

export const store = createStore(reducer, fallbackState, devTools);

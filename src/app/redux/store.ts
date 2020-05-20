import { createStore } from 'redux';
import {reducer} from './reducer';

export interface State {
  isLittleEndian: boolean,
  format: {
    selected: string,
    value: string,
    custom: string,
  }
}

export const fallbackState: State = {
  isLittleEndian: true,
  format: {
    selected: "raw",
    value: "%s",
    custom: "yourCommand --flags '%s'",
  }
}

export const store = createStore(reducer, fallbackState);

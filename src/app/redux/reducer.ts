import deepcopy from "ts-deepcopy";
import * as Actions from './actions';
import {State, fallbackState} from './store';


export function reducer(state: State | undefined, action: Actions.Action): State {
  if (!state){
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }
  switch (action.type) {
    case Actions.FORMAT_CHANGED:
      let payload: Actions.FormatChangePayload = (action as Actions.FormatChangeAction).payload;
      return {
        ...state,
        format: {
          selected: payload.formatName ?? state.format.selected,
          value: payload.formatValue,
          custom: payload.customFormatValue ?? state.format.custom,
        },
      };
    case Actions.ENDIAN_TOGGLE:
      return {
        ...state,
        isLittleEndian: !state.isLittleEndian,
      };
  }
  return state;
}

export default reducer

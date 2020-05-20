import deepcopy from "ts-deepcopy";
import * as Actions from './actions';
import { State, fallbackState } from './store';


export function reducer(state: State | undefined, action: Actions.Action): State {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }
  switch (action.type) {
    case Actions.FORMAT_CHANGED: {
      let payload = (action as Actions.FormatChangeAction).payload;
      return {
        ...state,
        format: payload,
      };
    }
    case Actions.ENDIAN_TOGGLE: {
      return {
        ...state,
        isLittleEndian: !state.isLittleEndian,
      };
    }
    case Actions.SET_LIST_ENTRIES: {
      let payload: Actions.SetListPayload = (action as Actions.SetListAction).payload;
      return {
        ...state,
        entries: payload,
      };
    }
  }
  return state;
}

export default reducer

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
        persistent: {
          ...state.persistent,
          format: payload,
        },
      };
    }
    case Actions.ENDIAN_TOGGLE: {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          isLittleEndian: !state.persistent.isLittleEndian,
        },
      };
    }
    case Actions.SET_LIST_ENTRIES: {
      let payload: Actions.SetListPayload = (action as Actions.SetListAction).payload;
      return {
        ...state,
        persistent: {
          ...state.persistent,
          entries: payload,
        },
      };
    }
    case Actions.SET_TEXT_TO_COPY: {
      let payload: string = (action as Actions.SetTextToCopyAction).payload;
      return {
        ...state,
        copy: {
          ...state.copy,
          text: payload,
        },
      };
    }
    case Actions.SET_STATE: {
      let payload: State = (action as Actions.SetStateAction).payload;
      return payload;
    }
  }
  return state;
}

export default reducer

import * as Actions from './actions';
import { State, fallbackState } from './store';
import { Utils as StringUtils } from '../hex/String';
import { EXPORT_FORMAT } from '../views/hex/FormatChooser';


export function reducer(state: State | undefined, action: Actions.Action): State {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  if (action.type === Actions.NOOP) {
    return state;
  }

  state = {
    ...state,
    updateCounter: state.updateCounter + 1,
  };

  switch (action.type) {
    case Actions.FORMAT_CHANGED: {
      let payload = (action as Actions.FormatChangeAction).payload;
      if (payload.selected === EXPORT_FORMAT) {
        return {
          ...state,
          isExportSelected: true,
        };
      } else {
        return {
          ...state,
          persistent: {
            ...state.persistent,
            format: payload,
          },
          isExportSelected: false,
        };
      }
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
    case Actions.LIST_ADD: {
      let listCopy = [...state.persistent.entries.list];
      let newEntry = StringUtils.defaultValues();
      newEntry.pattern = "A".repeat(listCopy.length + 1);
      listCopy.push({
        key: state.persistent.entries.nextId,
        data: newEntry
      });

      return {
        ...state,
        persistent: {
          ...state.persistent,
          entries: {
            list: listCopy,
            nextId: state.persistent.entries.nextId + 1,
          },
        },
      };
    }
    case Actions.LIST_SWAP: {
      let payload = (action as Actions.ListSwapAction).payload;
      let listCopy = [...state.persistent.entries.list];
      let tmp = listCopy[payload.indexA];
      listCopy[payload.indexA] = listCopy[payload.indexB];
      listCopy[payload.indexB] = tmp;

      return {
        ...state,
        persistent: {
          ...state.persistent,
          entries: {
            ...state.persistent.entries,
            list: listCopy,
          },
        },
      };
    }
    case Actions.LIST_ITEM_UPDATE: {
      let payload = (action as Actions.ListItemChangeAction).payload;
      let listCopy = [...state.persistent.entries.list];
      listCopy[payload.index] = {
        ...listCopy[payload.index],
        data: payload.newValue,
      }

      return {
        ...state,
        persistent: {
          ...state.persistent,
          entries: {
            ...state.persistent.entries,
            list: listCopy,
          },
        },
      };
    }
    case Actions.LIST_DELETE: {
      let index = (action as Actions.ListDeleteAction).payload;
      let listCopy = [...state.persistent.entries.list];
      listCopy.splice(index, 1);

      return {
        ...state,
        persistent: {
          ...state.persistent,
          entries: {
            ...state.persistent.entries,
            list: listCopy,
          },
        },
      };
    }
    case Actions.LIST_DELETE_ALL: {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          entries: {
            list: [],
            nextId: 0,
          },
        },
      };
    }
    case Actions.SET_STATE: {
      let payload: State = (action as Actions.SetStateAction).payload;
      return {
        ...payload,
        updateCounter: state.updateCounter,
      }
    }
  }
  return state;
}

export default reducer

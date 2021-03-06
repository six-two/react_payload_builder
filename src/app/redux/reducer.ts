import * as Actions from './actions';
import { ListState, State, fallbackState } from './store';
import { Utils as StringUtils } from '../hex/String';
import { buildOutput } from '../hex/ByteStringBuilder';
import { parseFormatString } from '../views/output/FormatChooser';

function updateErrors(modifyInPlace: State): State {
  // This should be called aufter all other reducers, since it might depend on them
  modifyInPlace.hasErrors = (modifyInPlace.outputBuilderResult.errorMessage ||
    modifyInPlace.parsedFormat.errorMessage) !== undefined;
  return modifyInPlace;
}

export function reducer(state: State | undefined, action: Actions.Action): State {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  state = {
    ...state,
    updateCounter: state.updateCounter + 1,
  };

  switch (action.type) {
    case Actions.FORMAT_CHANGED: {
      let payload = (action as Actions.FormatChangeAction).payload;
      return updateErrors({
        ...state,
        persistent: {
          ...state.persistent,
          format: payload,
        },
        parsedFormat: parseFormatString(payload.value),
      });
    }
    case Actions.ENDIAN_TOGGLE: {
      return buildOutput({
        ...state,
        persistent: {
          ...state.persistent,
          isLittleEndian: !state.persistent.isLittleEndian,
        },
      });
    }
    case Actions.LIST_ADD:
    case Actions.LIST_SWAP:
    case Actions.LIST_ITEM_UPDATE:
    case Actions.LIST_DELETE:
    case Actions.LIST_DELETE_ALL: {
      let copy: ListState = {
        list: [...state.persistent.entries.list],
        nextId: state.persistent.entries.nextId,
      }
      copy = updateList(copy, action);

      return updateErrors(buildOutput({
        ...state,
        persistent: {
          ...state.persistent,
          entries: copy,
        },
      }));
    }

    case Actions.SET_STATE: {
      let payload: State = (action as Actions.SetStateAction).payload;
      return updateErrors(buildOutput({
        ...payload,
        updateCounter: state.updateCounter,
        parsedFormat: parseFormatString(payload.persistent.format.value),
      }));
    }
  }
  return state;
}

function updateList(copy: ListState, action: Actions.Action): ListState {
  // For nicer code this function is allowed to modify "copy"
  switch (action.type) {
    case Actions.LIST_ADD: {
      let newEntry = StringUtils.defaultValues();
      newEntry.pattern = "A".repeat(copy.list.length + 1);
      copy.list.push({
        key: copy.nextId,
        data: newEntry
      });
      copy.nextId += 1;
      return copy;
    }
    case Actions.LIST_SWAP: {
      let payload = (action as Actions.ListSwapAction).payload;
      let tmp = copy.list[payload.indexA];
      copy.list[payload.indexA] = copy.list[payload.indexB];
      copy.list[payload.indexB] = tmp;
      return copy;
    }
    case Actions.LIST_ITEM_UPDATE: {
      let payload = (action as Actions.ListItemChangeAction).payload;
      copy.list[payload.index] = {
        key: copy.list[payload.index].key,
        data: payload.newValue,
      }
      return copy;
    }
    case Actions.LIST_DELETE: {
      let index = (action as Actions.ListDeleteAction).payload;
      copy.list.splice(index, 1);
      return copy;
    }
    case Actions.LIST_DELETE_ALL: {
      return {
        list: [],
        nextId: 0,
      };
    }
  }
  throw new Error("Case not handled!")
}

export default reducer

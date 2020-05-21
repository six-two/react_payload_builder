import { State, fallbackState } from './store';
import { uriSafeDecode, uriSafeEncode } from '../hex/Escaper';
import { AnyValues } from '../hex/ByteStringBuilder';
import { store } from './store';
import { setState } from './actions';


export function exportToUri(): string {
  let stateString = serialize(store.getState().persistent);

  // take the current url and set the import param to our current state
  const urlBuilder = new URL(window.location.href);
  urlBuilder.searchParams.set("import", stateString);
  return urlBuilder.href;
}


export function tryImportFromUri(): boolean {
  const url = new URL(window.location.href);
  const data = url.searchParams.get("import");
  if (!data){
    console.log("URI does not contain data to import");
    return false;
  }
  return tryImportFromString(data);
}

export function tryImportFromString(data: string): boolean {
  try {
    const state = deserialize(data);
    store.dispatch(setState(state));
    return true;
  } catch (e) {
    console.error("Loading state failed:", e);
    return false;
  }
}


export function serialize(state: any/*State::persistent*/): string {
  // remove all keys (to safe space and to not store hidden stuff)
  let entries = state.entries.list.map((x: any) => x.data);
  let simplified = {
    ...state,
    entries: entries,
  };
  console.log("exported state", simplified);
  return uriSafeEncode(JSON.stringify(simplified));
}

export function deserialize(data: string): State {
  try {
    let jsonText = tryOrMessage(() => uriSafeDecode(data), `Decoding base64 failed\nBase64 text: '${data}'`);
    let deserialized = tryOrMessage(() => JSON.parse(jsonText), `Decoding JSON failed!\nJSON: ${jsonText}`);
    let list = deserialized.entries.map(
      (data: AnyValues, index: number) => { return { key: index, data: data } }
    );
    //TODO check if it matches the type
    return {
      ...fallbackState,
      persistent: {
        ...deserialized,
        entries: {
          list: list,
          nextId: list.length,
        },
      },
    }
  } catch (error) {
    throw new Error(`deserialize failed: ${error}`)
  }
}

function tryOrMessage(fn: () => any, message: string): any {
  try {
    return fn();
  } catch (error) {
    throw new Error(`${message}\n\nCaused by '${error}'`);
  }
}

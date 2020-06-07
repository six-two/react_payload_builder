import { State, PersistentState, fallbackState } from './store';
import { uriSafeDecode, uriSafeEncode } from '../hex/Escaper';
import { AnyValues } from '../hex/ByteStringBuilder';
import { store } from './store';
import { setState } from './actions';

interface MinimizedState {
  le: boolean,
  f: {
    s: string,
    v: string,
    c: string,
  },
  l: AnyValues[],//TODO compress this
}

let currentHash = "";

export function hashChangeListener() {
  if (window.location.hash !== currentHash) {
    currentHash = window.location.hash;
    console.log("Hash changed externally, let's import the new state");
    tryImportFromUri();
  } else {
    console.debug("Hash changed, but the app did it");
  }
}

function minimizeState(s: PersistentState): MinimizedState {
  return {
    le: s.isLittleEndian,
    f: {
      s: s.format.selected,
      v: s.format.value,
      c: s.format.custom,
    },
    l: s.entries.list.map((x: any) => x.data),
  }
}

function unminimizeState(min: MinimizedState): State {
  let list = min.l.map(
    (data: AnyValues, index: number) => { return { key: index, data: data } }
  );
  return {
    ...fallbackState,
    persistent: {
      isLittleEndian: min.le,
      format: {
        selected: min.f.s,
        value: min.f.v,
        custom: min.f.c,
      },
      entries: {
        list: list,
        nextId: list.length,
      }
    }
  }
}


// Changes the hash part of the current url as a sideeffect
export function exportToUri(): string {
  let stateString = serialize(store.getState().persistent);

  // take the current url and set the import param to our current state
  const newHash = "#state=" + stateString;

  // Update the current url
  currentHash = newHash;// Do this before we change the hash, so we do not import the state
  window.location.hash = newHash;
  return window.location.href;
}


export function tryImportFromUri(): boolean {
  if (window.location.hash) {
    // To avoid undefined edge cases just parse it like a normal url
    const mockUrl = "http://example.com/?" + window.location.hash.slice(1);
    const url = new URL(mockUrl); // parse mock url
    const data = url.searchParams.get("state");
    if (data) {
      return tryImportFromString(data);
    }
  }
  console.log("URI does not contain data to import");
  return false;
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


export function serialize(state: PersistentState): string {
  let min = minimizeState(state);
  // console.log("exported state", min);
  return uriSafeEncode(JSON.stringify(min));
}

export function deserialize(data: string): State {
  try {
    let jsonText = tryOrMessage(() => uriSafeDecode(data), `Decoding base64 failed\nBase64 text: '${data}'`);
    let deserialized = tryOrMessage(() => JSON.parse(jsonText), `Decoding JSON failed!\nJSON: ${jsonText}`);
    let min = deserialized as MinimizedState;
    if (!min) {
      throw new Error("Missing keys in decoded JSON");
    }
    //TODO check if it matches the type
    return unminimizeState(min);
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

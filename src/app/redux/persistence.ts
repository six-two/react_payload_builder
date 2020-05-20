import { State, fallbackState } from './store';
import { uriSafeDecode, uriSafeEncode } from '../hex/Escaper';
import { AnyValues } from '../hex/ByteStringBuilder';


export function serialize(state: any/*State::persistent*/): string {
  // remove all keys (to safe space and to not store hidden stuff)
  let entries = state.entries.list.map((x: any) => x.data);
  let simplified = {
    ...state.persistent,
    entries: entries,
  };
  return uriSafeEncode(JSON.stringify(simplified));
}

export function deserialize(data: string): State {
  try {
    let simplified = JSON.parse(uriSafeDecode(data));
    let list = simplified.entries.map(
      (data: AnyValues, index: number) => { return { key: index, data: data } }
    );
    return {
      persistent: {
        ...simplified,
        entries: {
          list: list,
          nextId: list.length,
        },
      },
      copy: fallbackState.copy,
    }
  } catch (error) {
    throw new Error(`deserialize failed: ${error}`)
  }
}

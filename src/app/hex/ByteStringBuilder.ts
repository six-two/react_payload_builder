import { ListEntry } from '../redux/store';
import * as Padding from './Padding';
import * as Int from './Integer';
import * as Str from './String';
import ByteString from './ByteString';

const BAD_INPUT_ERROR_NAME = "BadInputError";
const ERROR_BYTE_STRING: TaggedByteString = {
  key: -1,
  data: ByteString.fromString("Error: Please check your inputs. @dev: This message should not be shown"),
}

export function throwBadInputError(message: string) {
  // This function creates an error that signals, that it was caused by bad user input
  let e = new Error(message || "Something went wrong. Please check your inputs")
  e.name = BAD_INPUT_ERROR_NAME;
  throw e;
}

export class ByteStringBuilder {
  littleEndian: boolean;

  constructor(littleEndian: boolean = true) {
    this.littleEndian = littleEndian;
  }

  getBytesStrings(blueprintList: ListEntry[]): BuilderResult {
    let i: number = 0;
    try {
      let processed: TaggedByteString[] = [];
      let previous: ByteString[] = [];
      for (i = 0; i < blueprintList.length; i++) {
        let bytes: ByteString = this.toBytes(blueprintList[i].data, previous);
        let entry = { key: blueprintList[i].key, data: bytes };
        previous.push(bytes);
        processed.push(entry);
      }
      return { byteStrings: processed };
    } catch (e) {
      if (e.name === BAD_INPUT_ERROR_NAME) {
        return { errorMessage: `Error in input ${i + 1}: ${e.message}`, byteStrings: [ERROR_BYTE_STRING] };
      } else {
        throw e;
      }
    }
  }

  toBytes(blueprint: AnyValues, previousByteStrings: ByteString[]): ByteString {
    switch (blueprint.type) {
      case Padding.TYPE:
        return Padding.Utils.paddingToBytes(blueprint as Padding.Values, previousByteStrings);
      case Int.TYPE:
        return Int.Utils.integerToBytes(blueprint as Int.Values, this.littleEndian);
      case Str.TYPE:
        return Str.Utils.stringToBytes(blueprint as Str.Values);
      case Str.TYPE_REVERSED:
        return Str.ReversedUtils.stringToBytes(blueprint as Str.Values);
      default:
        throw new Error("Unknown type");
    }
  }

  isValid(blueprint: AnyValues): boolean {
    try {
      this.toBytes(blueprint, []);//will throw error if is not valid
      return true;
    } catch {
      return false;
    }
  }
};

export type AnyValues = Padding.Values | Int.Values | Str.Values;


export interface BuilderResult {
  byteStrings: TaggedByteString[],
  errorMessage?: string,
}

export interface TaggedByteString {
  key: number,
  data: ByteString,
}

export default ByteStringBuilder;

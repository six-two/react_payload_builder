import ByteString from "./ByteString";

export const INT_8 = "8 bit";
export const INT_16 = "16 bit";
export const INT_32 = "32 bit";
export const INT_64 = "64 bit";
export const TYPE = "Integer";

const MAX_INT_MAP = new Map<string, bigint>();
MAX_INT_MAP.set(INT_8, 0xffn);
MAX_INT_MAP.set(INT_16, 0xffffn);
MAX_INT_MAP.set(INT_32, 0xffffffffn);
MAX_INT_MAP.set(INT_64, 0xffffffffffffffffn);

const BYTE_COUNT_MAP = new Map<string, number>();
BYTE_COUNT_MAP.set(INT_8, 1);
BYTE_COUNT_MAP.set(INT_16, 2);
BYTE_COUNT_MAP.set(INT_32, 4);
BYTE_COUNT_MAP.set(INT_64, 8);

export interface Values {
  numberString: string,
  numberType: string,
  type: string,
}

export class Utils {
  static defaultValues(): Values {
    return {
      numberString: "0x41414141",
      numberType: INT_32,
      type: TYPE,
    };
  }

  static getErrorMessage(integer: Values) {
    try {
      var num: bigint = Utils.parseNumber(integer.numberString);
      const type: string = integer.numberType;
      let maxOrNull = MAX_INT_MAP.get(type);
      if (!maxOrNull) {
        throw new Error(`Unknown number type: ${type}`);
      } else {
        let max: bigint = maxOrNull;
        if (num > max) {
          return `Number to big for '${type}'`;
        }
        if (num < 0n) {
          const min: bigint = (max + 1n) / BigInt(-2);
          if (num < min) {
            return `Number to big for '${type}'`;
          }
        }
      }
    } catch (e) {
      return "Parsing integer failed";
    }
  }

  static parseNumber(string: string): bigint {
    // Remove characters that can be used to make strings more human readable
    string = string.replace(/[\s_]+/g, "");
    return BigInt(string);
  }


  static integerToBytes(integer: Values,
    littleEndian: boolean = true): ByteString {
    var error = Utils.getErrorMessage(integer);
    if (error) {
      return new ByteString(`<Error: ${error}>`)
    }
    var num: bigint = Utils.parseNumber(integer.numberString);
    let max = MAX_INT_MAP.get(integer.numberType);
    let byteCount = BYTE_COUNT_MAP.get(integer.numberType);
    if (!max || !byteCount) {
      throw new Error(`Unknown number type: ${integer.numberType}`);
    }
    if (num < 0n) {
      num += max + 1n;
    }
    let hex: string = num.toString(16);
    let missingChars = 2 * byteCount - hex.length;
    hex = "0".repeat(missingChars) + hex;//padd with leading zeros
    let bytes: ByteString = ByteString.fromHex(hex);
    return littleEndian ? bytes.getReversed() : bytes;
  }
}

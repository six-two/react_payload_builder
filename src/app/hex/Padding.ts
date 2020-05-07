import ByteString from "./ByteString";
import {throwBadInputError} from "./ByteStringBuilder";

export interface Values {
  paddToLength: number,
  pattern: string,
  type: string,
}

export const TYPE = "Padding";


export class Utils {
  static defaultValues(): Values {
    return {
      pattern: "A",
      paddToLength: 1,
      type: TYPE,
    };
  }

  static paddingToBytes(padding: Values, previousByteStrings: ByteString[]): ByteString {
    var offset = 0;
    for (var i = 0; i < previousByteStrings.length; i++) {
      offset += previousByteStrings[i].bytes.length;
    }
    var missing = padding.paddToLength - offset;
    if (missing < 0) {
      throwBadInputError(`Padding should be applied up to index ${padding.paddToLength}, but the string is already longer than that (length=${offset})`);
    }
    const patternBytes = new ByteString(padding.pattern ? padding.pattern : "?");
    const repeatCount = Math.floor(missing / patternBytes.bytes.length);
    const incompleteSize = missing - (repeatCount * patternBytes.bytes.length)
    var paddingStr: string = patternBytes.str.repeat(repeatCount);
    var incompletePadding: string[] = patternBytes.bytes.slice(0, incompleteSize);
    let incompletePaddingStr: string = incompletePadding.join("");
    return new ByteString(paddingStr + incompletePaddingStr);
  }
}

export default Values;

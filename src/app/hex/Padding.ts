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
    if (!padding.pattern) {
      throwBadInputError("Padding can not be empty");
    }

    const patternBytes = ByteString.fromString(padding.pattern);
    const repeatCount = Math.floor(missing / patternBytes.length);
    const incompleteSize = missing - (repeatCount * patternBytes.length)

    const incompletePadding: string[] = patternBytes.bytes.slice(0, incompleteSize);
    let repeated = patternBytes.repeated(repeatCount);
    repeated.bytes.push(...incompletePadding);
    return repeated;
  }
}

export default Values;

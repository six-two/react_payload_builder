import ByteString from "./ByteString";

export interface Values {
  repeatCount: number,
  pattern: string,
  type: string,
}

export const TYPE = "String";
export const TYPE_REVERSED = "String (reversed)";


export class Utils {
  static defaultValues(): Values {
    return {
      pattern: "A",
      repeatCount: 1,
      type: TYPE,
    };
  }

  static stringToBytes(values: Values): ByteString {
    let bytes = ByteString.fromString(values.pattern);
    return bytes.repeated(values.repeatCount);
  }
}

export class ReversedUtils {
  static defaultValues(): Values {
    return {
      pattern: "A",
      repeatCount: 1,
      type: TYPE_REVERSED,
    };
  }

  static stringToBytes(values: Values): ByteString {
    let bytes = ByteString.fromString(values.pattern);
    return bytes.reversed().repeated(values.repeatCount);
  }
}

export default Values;

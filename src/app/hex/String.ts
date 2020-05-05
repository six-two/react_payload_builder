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
    const count = values.repeatCount;
            let pattern = values.pattern.repeat(count);
            return new ByteString(pattern);
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
    const count = values.repeatCount;
          let revPattern = new ByteString(values.pattern).getReversed().str;
          let pattern = revPattern.repeat(count);
          return new ByteString(pattern);

  }
}

export default Values;

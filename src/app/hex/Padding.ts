import ByteString from "./ByteString";

export interface Values {
  number: number,
  pattern: string,
  repeatType: string,
  type: string,
}

export const REPEAT_N = "Repeat N times";
export const REPEAT_TO = "Repeat up to index";
export const TYPE = "Padding";


export class Utils {
  static defaultValues(): Values {
      return {
         pattern: "A",
         repeatType: REPEAT_N,
         number: 1,
         type: TYPE,
     };
  }

  static paddingToBytes(padding: Values, previousByteStrings: ByteString[]): ByteString {
      switch (padding.repeatType) {
          case REPEAT_N:
              const count = padding.number;
              const pattern = padding.pattern.repeat(count);
              return new ByteString(pattern);
          case REPEAT_TO:
              var offset = 0;
              for (var i = 0; i < previousByteStrings.length; i++) {
                  offset += previousByteStrings[i].bytes.length;
              }
              var missing = padding.number - offset;
              if (missing < 0) {
                  return new ByteString("<Padding can not satisfy condition: to many previous bytes>");
              }
              const patternBytes = new ByteString(padding.pattern ? padding.pattern : "?");
              const repeatCount = Math.floor(missing / patternBytes.bytes.length);
              const incompleteSize = missing - (repeatCount * patternBytes.bytes.length)
              var paddingStr: string = patternBytes.str.repeat(repeatCount);
              var incompletePadding: string[] = patternBytes.bytes.slice(0, incompleteSize);
              let incompletePaddingStr: string = incompletePadding.join("");
              return new ByteString(paddingStr + incompletePaddingStr);
          default:
              throw new Error(`Bug: Unknown padding repeat type ${padding.repeatType}`);
      }
  }
}

export default Values;

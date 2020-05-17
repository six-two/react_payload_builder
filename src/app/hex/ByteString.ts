const hexEscapeRegex = /\x[0-9a-fA-F]{2}/

export default class ByteString {
  bytes: string[];

  constructor(bytes: string[]) {
    this.bytes = bytes;
  }

  get length(): number {
    return this.bytes.length;
  }

  toString(): string {
    return this.bytes.join("");
  }

  append(other: ByteString) {
    this.bytes.push(...other.bytes);
  }

  reversed(): ByteString {
    let copy = [...this.bytes];
    copy.reverse();
    return new ByteString(copy);
  }

  repeated(n: number): ByteString {
    let repeated = [];
    for (let i = 0; i < n; i++) {
      repeated.push(...this.bytes);
    }
    return new ByteString(repeated);
  }

  static fromString(str: string): ByteString {
    let bytes: string[] = [];
    let i = 0;
    while (i < str.length) {
      let slice = str.slice(i, i + 4);
      if (slice.match(hexEscapeRegex)) {
        // add "\x??" as one byte
        bytes.push(slice);
        i += 4;
      } else {
        // Escape backslashes if they are not used for entering escaped characters
        let char = str[i] !== "\\" ? str[i] : "\\x5c";
        bytes.push(char);
        i += 1;
      }
    }
    return new ByteString(bytes);
  }

  static fromHex(hex: string): ByteString {
    if (hex.length % 2 === 1) {
      throw new Error("Hex has odd length");
    }
    const len = hex.length / 2;
    let result = Array(len);
    for (var i = 0; i < len; i++) {
      result[i] = "\\x" + hex.slice(2 * i, 2 * i + 2);
    }
    return new ByteString(result);
  }
}

const hexEscapeRegex = /\x[0-9a-fA-F]{2}/

export default class ByteString {
  str: string;
  bytes: string[];

  constructor(str: string) {
    this.bytes = []

    let i = 0;
    while (i < str.length) {
      let slice = str.slice(i, i + 4);
      if (slice.match(hexEscapeRegex)) {
        this.bytes.push(slice);
        i += 4;
      } else {
        // Escape backslashes if they are not used for entering escaped characters
        let char = str[i] !== "\\"? str[i] : "\\x5c";
        this.bytes.push(char);
        i += 1;
      }
    }
    this.str = this.bytes.join("");
  }

  getReversed(): ByteString {//TODO later: is pretty inefficient
    let invStr = "";
    for (let i = this.bytes.length - 1; i >= 0; i--) {
      invStr += this.bytes[i];
    }
    return new ByteString(invStr);
  }

  static fromHex(hex: string): ByteString {
    if (hex.length % 2 === 1) {
      throw new Error("Hex has odd length");
    }
    let result = "";
    for (var i = 0; i < hex.length; i += 2) {
      result += "\\x" + hex.slice(i, i + 2);
    }
    return new ByteString(result);
  }
}

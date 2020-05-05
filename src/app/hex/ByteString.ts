export default class ByteString {
    str: string;
    bytes: string[];

    constructor(str: string) {
        this.str = str;
        this.bytes = []
        this.updateByteCount();
    }

    updateByteCount() {
        let i = 0;
        this.bytes = []
        while (i < this.str.length){
            if (this.str[i] === "\\" && i + 1 < this.str.length && this.str[i+1] === "x"){
                if (isNaN(parseInt(this.str[i+2], 16)) || isNaN(parseInt(this.str[i+3], 16))) {
                    throw new Error("Not a valid hex escape: '" + this.str.slice(i+2, i+4)+"'");
                }
                this.bytes.push(this.str.slice(i, i+4));
                i += 4;
            } else {
                this.bytes.push(this.str[i]);
                i += 1;
            }
        }
    }

    getInverted(): ByteString {//TODO later: is pretty inefficient
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
        result += "\\x" + hex.slice(i, i+2);
      }
      return new ByteString(result);
    }
}

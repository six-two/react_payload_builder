class ByteString {
    constructor(str) {
        this.str = str;
        this.updateByteCount();
    }

    updateByteCount() {
        var i = 0;
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
}

export default ByteString;

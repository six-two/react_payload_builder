import {REPEAT_N, REPEAT_TO} from './hextypes/Padding';
import Padding from './hextypes/Padding';


class ByteString {
    constructor(str) {
        this.str = str;
        this.updateByteCount();
    }

    updateByteCount() {
        var i = 0;
        this.byteCount = 0;
        while (i < this.str.length){
            if (this.str[i] === "\\" && i + 1 < this.str.length && this.str[i+1] === "x"){
                i += 4;
            } else {
                i += 1;
            }
            this.byteCount += 1;
        }
    }

    getFirstNBytes(n) {
        var i = 0;
        var byteCount = 0;
        while (i < this.str.length){
            if (n >= byteCount){
                return new ByteString(this.str.slice(0, i));//TODO test
            }
            if (this.str[i] === "\\" && i + 1 < this.str.length && this.str[i+1] === "x"){
                i += 4;
            } else {
                i += 1;
            }
            byteCount += 1;
        }
        return this;
    }
}

class Instance {
    static getBytesStrings(blueprintList){
        var processed = [];
        for (var i = 0; i < blueprintList.length; i++) {
            var tmp = Instance.toBytes(blueprintList[i], processed);
            processed.push(tmp);
        }
        return processed;
    }

    static toBytes(blueprint, previousByteStrings) {
        switch (blueprint.type) {
            case Padding.type:
                return Instance.paddingToBytes(blueprint, previousByteStrings);
            default:
                return ByteString("<Unknown type>");
        }
    }

    static paddingToBytes(blueprint, previousByteStrings) {
        switch (blueprint.repeatType) {
            case REPEAT_N:
                const count = blueprint.number;
                const pattern = blueprint.pattern.repeat(count);
                return new ByteString(pattern);
            case REPEAT_TO:
                var offset = 0;
                for (var i = 0; i < previousByteStrings.length; i++) {
                    offset += previousByteStrings[i].length;
                }
                var missing = blueprint.number - offset;
                if (missing < 0) {
                    return new ByteString("<Padding can not satisfy condition: to many previous bytes>");
                }
                const patternBytes = new ByteString(blueprint.pattern);
                const repeatCount = Math.floor(missing / patternBytes.byteCount);
                var padding = patternBytes.str.repeat(repeatCount);
                var incompletePadding = patternBytes.getFirstNBytes(missing - repeatCount);
                return new ByteString(padding + incompletePadding.str);
            default:
                return ByteString("<Unknown type>");
        }
    }
};

export {ByteString};
export default Instance;

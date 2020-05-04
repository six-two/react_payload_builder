import {REPEAT_N, REPEAT_TO} from './views/hex/PaddingEditView';
import Padding from './views/hex/PaddingEditView';
import ByteString from './ByteString';

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
                return new ByteString("<Unknown type>");
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
                    offset += previousByteStrings[i].bytes.length;
                }
                var missing = blueprint.number - offset;
                if (missing < 0) {
                    return new ByteString("<Padding can not satisfy condition: to many previous bytes>");
                }
                const patternBytes = new ByteString(blueprint.pattern ? blueprint.pattern : "?");
                const repeatCount = Math.floor(missing / patternBytes.bytes.length);
                const incompleteSize = missing - (repeatCount * patternBytes.bytes.length)
                var padding = patternBytes.str.repeat(repeatCount);
                var incompletePadding = patternBytes.bytes.slice(0, incompleteSize);
                incompletePadding = incompletePadding.join("");
                console.log(missing, blueprint.pattern, padding, incompletePadding);
                return new ByteString(padding + incompletePadding);
            default:
                return new ByteString("<Unknown type>");
        }
    }
};

export default Instance;

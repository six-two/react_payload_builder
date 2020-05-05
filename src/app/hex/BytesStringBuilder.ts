import * as Padding from './Padding';
import * as Int from './Integer';
import * as Str from './String';
import ByteString from './ByteString';

export default class Instance {
    static getBytesStrings(blueprintList: Blueprint[]): TaggedByteString[]{
        let processed: TaggedByteString[] = [];
        let previous: ByteString[] = [];
        for (let i = 0; i < blueprintList.length; i++) {
            let bytes: ByteString = Instance.toBytes(blueprintList[i].data, previous);
            let entry = {key: blueprintList[i].key, data: bytes};
            previous.push(bytes);
            processed.push(entry);
        }
        return processed;
    }

    static toBytes(blueprint: any, previousByteStrings: ByteString[]): ByteString {
        switch (blueprint.type) {
            case Padding.TYPE:
                return Padding.Utils.paddingToBytes(blueprint, previousByteStrings);
            case Int.TYPE:
                let littleEndian = true;
                return Int.Utils.integerToBytes(blueprint, littleEndian);
            case Str.TYPE:
                return Str.Utils.stringToBytes(blueprint);
            case Str.TYPE_REVERSED:
                return Str.ReversedUtils.stringToBytes(blueprint);
            default:
                return new ByteString("<Unknown type>");
        }
    }


};

interface Blueprint {
  key: number,
  data: any,
}

interface TaggedByteString {
  key: number,
  data: ByteString,
}
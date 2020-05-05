import * as Padding from './Padding';
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

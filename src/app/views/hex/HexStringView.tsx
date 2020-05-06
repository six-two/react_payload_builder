import React from 'react';
import BytesStringBuilder from '../../hex/BytesStringBuilder';
import ByteString from '../../hex/ByteString';
import CopyButton from '../CopyButton';

export default class HexStringView extends React.Component<Props, {}> {
  render() {
    try {
      const byteStrings: TaggedByteString[] = BytesStringBuilder.getBytesStrings(this.props.blueprints);
      return (
        <div style={{ backgroundColor: "lightgray", textAlign: "center", margin: "25px" }}>
          {this.renderCopyButton(byteStrings)}
          {byteStrings.map(
            (value: TaggedByteString, i: number) => {
              const color: string = this.props.colors[i % this.props.colors.length];
              return <span style={{ color: color, overflowWrap: "break-word" }} key={value.key}>{value.data.str}</span>;
            })}
        </div>
      );
    } catch (e) {
      return (
        <div className="error-message" style={{ backgroundColor: "red" }}>
          <p>An error occured while creating the output</p>
          {e.name + ": " + e.message}
        </div>
      );
    }
  }

  renderCopyButton(byteStrings: TaggedByteString[]) {
    const enableCopy = this.props.enableCopy ?? false;
    if (enableCopy) {
      let tmp: string[] = byteStrings.map((tbs: TaggedByteString) => { return tbs.data.str });
      let textToCopy = tmp.join("");
      return <div><CopyButton text={textToCopy} /><br /></div>;
    }
  }
}

interface Props {
  blueprints: Blueprint[],
  colors: string[],
  enableCopy?: boolean,
}

interface Blueprint {
  key: number,
  data: any,
}

interface TaggedByteString {
  key: number,
  data: ByteString,
}

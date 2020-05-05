import React from 'react';
import BytesStringBuilder from '../../hex/BytesStringBuilder';
import ByteString from '../../hex/ByteString';

export default class HexStringView extends React.Component<Props, {}> {
    render() {
        try {
            return (
                <div style={{backgroundColor: "lightgray", textAlign: "center", margin: "25px"}}>
                    {BytesStringBuilder.getBytesStrings(this.props.blueprints).map(
                      (value: TaggedByteString, i: number) => {
                        const color: string = this.props.colors[i % this.props.colors.length];
                        //TODO use a real key
                        return <span style={{color: color}} key={value.key}>{value.data.str}</span>;
                    })}
                </div>
            );
        } catch (e) {
            return (
                <div className="error-message" style={{backgroundColor: "red"}}>
                    <p>An error occured while creating the output</p>
                    {e.name+": "+e.message}
                </div>
            );
        }
    }
}

interface Props {
  blueprints: Blueprint[],
  colors: string[],
}

interface Blueprint {
  key: number,
  data: any,
}

interface TaggedByteString {
  key: number,
  data: ByteString,
}

import React from 'react';
import { connect } from 'react-redux';
import { TaggedByteString, BuilderResult } from '../../hex/ByteStringBuilder';
import * as Esc from '../../hex/Escaper';
import { ParsedFormat, State as ReduxState } from '../../redux/store';
import ColoredHexDumpView from './HexDumpView';
import { parseFormatString } from './FormatChooser';


class ColoredHexStringView_ extends React.Component<Props> {
  render() {
    if (this.props.format.errorMessage) {
      return null;
    }
    switch (this.props.format.format) {
      case "%h":
        return <ColoredHexDumpView />
      case "%x":
        return this.renderWithEscapeFunction(Esc.printfEscapeByte);
      case "%u":
        return this.renderWithEscapeFunction(Esc.urlEscapeByte);
      default:
        return <span className="err-msg">
          BUG: Unknown format: "{this.props.format.format}"
      </span>;
    }
  }

  renderWithEscapeFunction(escapeFunction: (byte: string) => string) {
    const escapedTaggedStrings: TaggedString[] = this.props.builderResult.byteStrings.map((bs: TaggedByteString) => {
      return {
        key: bs.key,
        str: Esc.escapeBytes(bs.data, escapeFunction).toString(),
      };
    });
    const labels = this.props.format.labels;

    return <div className="colored-bytes">
      {labels[0]}
      {escapedTaggedStrings.map((value: TaggedString) => {
        return <span className="multi-colored" key={value.key}>
          {value.str}
        </span>;
      })}
      {labels[1]}
    </div>;
  }
}

export interface Props {
  builderResult: BuilderResult,
  format: ParsedFormat,
}

interface TaggedString {
  str: string,
  key: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any): Props => {
  return {
    ...ownProps,
    builderResult: state.outputBuilderResult,
    format: state.parsedFormat,
  };
};

const ColoredHexStringView = connect(mapStateToProps)(ColoredHexStringView_);
export default ColoredHexStringView;

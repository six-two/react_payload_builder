import React from 'react';
import { connect } from 'react-redux';
import { TaggedByteString, ByteStringBuilder, BuilderResult } from '../../hex/ByteStringBuilder';
import * as Esc from '../../hex/Escaper';
import { ListEntry, State as ReduxState } from '../../redux/store';
import ClipboardManager from '../../ClipboardManager';

const INSERT_HERE_REGEX = /%[xu]/g;


class ColoredHexStringView_ extends React.Component<Props> {
  render() {
    const labels = this.props.formatString.split(INSERT_HERE_REGEX);
    if (labels.length !== 2) {
      return this.renderErrorMessage('Format has to contain exactly one "%x" (\\x?? escape) or "%u" (%?? escape)');
    }
    const isPercentXEscape = this.props.formatString.indexOf("%x") >= 0;
    const escapeFunction = isPercentXEscape ? Esc.printfEscapeByte : Esc.urlEscapeByte;

    if (this.props.builderResult.errorMessage) {
      return this.renderErrorMessage(this.props.builderResult.errorMessage);
    }

    let escapedTaggedStrings: TaggedString[] = this.props.builderResult.byteStrings.map((bs: TaggedByteString) => {
      return {
        key: bs.key,
        str: Esc.escapeBytes(bs.data, escapeFunction).toString(),
      };
    });

    let textToCopy = escapedTaggedStrings.map((tbs) => { return tbs.str }).join("");
    textToCopy = labels[0] + textToCopy + labels[1];
    ClipboardManager.setTextToCopy(textToCopy);

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

  renderErrorMessage(text: string) {
    ClipboardManager.setTextToCopy(null);
    return <span className="err-msg">
      {text}
    </span>
  }
}

export interface Props {
  builderResult: BuilderResult,
  isLittleEndian: boolean,
  formatString: string,
}

interface TaggedString {
  str: string,
  key: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any): Props => {
  return {
    ...ownProps,
    isLittleEndian: state.persistent.isLittleEndian,
    builderResult: state.outputBuilderResult,
    formatString: state.persistent.format.value,
  };
};

const ColoredHexStringView = connect(mapStateToProps)(ColoredHexStringView_);
export default ColoredHexStringView;

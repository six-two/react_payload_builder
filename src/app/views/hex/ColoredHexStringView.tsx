import React from 'react';
import { connect } from 'react-redux';
import { TaggedByteString, ByteStringBuilder } from '../../hex/ByteStringBuilder';
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

    let result = new ByteStringBuilder(this.props.isLittleEndian)
      .getBytesStrings(this.props.blueprints);
    if (result.errorMessage) {
      return this.renderErrorMessage(result.errorMessage);
    }

    let escapedTaggedStrings: TaggedString[] = result.byteStrings.map((bs: TaggedByteString) => {
      return {
        key: bs.key,
        str: Esc.escapeBytes(bs.data, escapeFunction).toString(),
      };
    });

    let textToCopy = escapedTaggedStrings.map((tbs) => { return tbs.str }).join("");
    textToCopy = labels[0] + textToCopy + labels[1];
    ClipboardManager.setTextToCopy(textToCopy);

    return <span>
      {labels[0]}
      {escapedTaggedStrings.map((value: TaggedString) => {
        return <span className="multi-colored" key={value.key}>
          {value.str}
        </span>;
      })}
      {labels[1]}
    </span>;
  }

  renderErrorMessage(text: string) {
    ClipboardManager.setTextToCopy(null);
    return <span className="err-msg">
      {text}
    </span>
  }
}

export interface Props {
  blueprints: ListEntry[],
  isLittleEndian: boolean,
  formatString: string,
}

interface TaggedString {
  str: string,
  key: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isLittleEndian: state.persistent.isLittleEndian,
    blueprints: state.persistent.entries.list,
    formatString: state.persistent.format.value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

const ColoredHexStringView = connect(mapStateToProps, mapDispatchToProps)(ColoredHexStringView_);
export default ColoredHexStringView;

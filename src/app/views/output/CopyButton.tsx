import React from 'react';
import { connect } from 'react-redux';
import { ParsedFormat, State as ReduxState } from '../../redux/store';
import { BuilderResult } from '../../hex/ByteStringBuilder';
import copy from 'copy-to-clipboard';
import * as Esc from '../../hex/Escaper';


class CopyButton_ extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { updateCounterWhenCopied: -1 };
  }

  render() {
    if (!this.getTextToCopy()) {
      return null;
    }

    const isCopied = this.props.updateCounter === this.state.updateCounterWhenCopied;
    const buttonText = isCopied ? "Copied" : "Copy";
    return (
      <button
        className="copy-button"
        onClick={this.onClick}>
        {buttonText}
      </button>
    );
  }

  onClick = (event: any) => {
    const textToCopy = this.getTextToCopy();
    if (textToCopy) {
      copy(textToCopy);
      this.setState({ updateCounterWhenCopied: this.props.updateCounter });
    }
  }

  getTextToCopy(): string | null {
    if (this.props.hasErrors) {
      return null;
    }
    switch (this.props.format.format) {
      case "%h":
        return null;
      case "%x":
        return this.getEscapedTextToCopy(Esc.printfEscapeByte);
      case "%u":
        return this.getEscapedTextToCopy(Esc.urlEscapeByte);
      default:
        console.error(`Unknown format: ${this.props.format.format}`);
        return null;
    }
  }

  getEscapedTextToCopy(escapeFunction: (byte: string) => string) {
    const escapedByteStrings = this.props.builderResult.byteStrings.map(
      (bs) => Esc.escapeBytes(bs.data, escapeFunction).toString()
    ).join("");
    return this.props.format.labels.join(escapedByteStrings);
  }
}

export interface Props {
  updateCounter: number,
  builderResult: BuilderResult,
  format: ParsedFormat,
  hasErrors: boolean,
}

export interface State {
  updateCounterWhenCopied: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    updateCounter: state.updateCounter,
    builderResult: state.outputBuilderResult,
    format: state.parsedFormat,
    hasErrors: state.hasErrors,
  };
};

const CopyButton = connect(mapStateToProps)(CopyButton_);
export default CopyButton;

import React from 'react';
import ClipbordManager from '../ClipboardManager';
import { connect } from 'react-redux';
import { State as ReduxState } from '../redux/store';


class CopyButton_ extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { updateCounterWhenCopied: -1 };
  }

  render() {
    if (!ClipbordManager.canCopy()) {
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
    if (ClipbordManager.canCopy()) {
      ClipbordManager.copyCurrent();
      this.setState({ updateCounterWhenCopied: this.props.updateCounter });
    }
  }
}

export interface Props {
  updateCounter: number,
}

export interface State {
  updateCounterWhenCopied: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    updateCounter: state.updateCounter,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

const CopyButton = connect(mapStateToProps, mapDispatchToProps)(CopyButton_);
export default CopyButton;

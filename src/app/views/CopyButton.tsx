import React from 'react';
import ClipbordManager from '../ClipboardManager';
import { connect } from 'react-redux';
import { State as ReduxState } from '../redux/store';


class CopyButton_ extends React.Component<Props> {
  render() {
    if (!ClipbordManager.canCopy()) {
      return null;
    }

    const buttonText = ClipbordManager.isAlreadyCopied() ? "Copied" : "Copy";
    return (
      <button onClick={this.onClick}
      disabled={!ClipbordManager.canCopy()}
      className="copy-button">
        {buttonText}
      </button>
    );
  }

  onClick = (event: any) => {
    ClipbordManager.copyCurrent();
  }
}

export interface Props {
  listenForClipboardUpdates: any,
}


const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    listenForClipboardUpdates: state.clipboardManagerUpdateCounter,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

const CopyButton = connect(mapStateToProps, mapDispatchToProps)(CopyButton_);
export default CopyButton;

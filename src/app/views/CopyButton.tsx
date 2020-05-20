import React from 'react';
import copy from 'copy-to-clipboard';
import ClipbordManager from '../ClipboardManager';

export default class CopyButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {count: 0}//TODO update on selected text change
  }

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
    this.setState({ count: this.state.count + 1 });// redraw the button -> change the text
  }
}

interface State {
  count: number,
}

export interface Props {
}

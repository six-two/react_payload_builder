import React from 'react';
import copy from 'copy-to-clipboard';

export default class CopyButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { copiedText: null };
  }

  render() {
    const alreadyCopied = this.props.text === this.state.copiedText;
    const buttonText = alreadyCopied ? "Copied" : "Copy";
    return (
      <button onClick={this.onClick}>
        {buttonText}
      </button>
    );
  }

  onClick = (event: any) => {
    const text = this.props.text;
    copy(text);
    this.setState({ copiedText: text });
  }
}

interface State {
  copiedText: string | null,
}

export interface Props {
  text: string,
}

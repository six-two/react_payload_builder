import React from 'react';
import { connect } from 'react-redux';
import CopyButton from './CopyButton';
import FormatChooser from "./FormatChooser";
import { State as ReduxState } from '../../redux/store';
import ColoredHexStringView from './ColoredHexStringView';
import EndianToggle from './EndianToggleView';

class OutputView_ extends React.Component<Props> {
  render() {
    return (
      <div className="byte-output">
        <div className="output-settings">
          <div className="wrapper">
            <FormatChooser />
            <EndianToggle />
            <CopyButton />
          </div>
        </div>
        {this.props.hasErrors ?
          <div className="err-msg">
            Your inputs caused the following error(s):
            <ul>
              {renderError(this.props.builderError)}
              {renderError(this.props.formatError)}
            </ul>
          </div>
          : <ColoredHexStringView />}
      </div>
    );
  }
}

function renderError(message?: string) {
  if (message) {
    return <li>          {message}        </li>
  }
}

export interface Props {
  builderError?: string,
  formatError?: string,
  hasErrors: boolean,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    builderError: state.outputBuilderResult.errorMessage,
    formatError: state.parsedFormat.errorMessage,
    hasErrors: state.hasErrors,
  };
};

const OutputView = connect(mapStateToProps)(OutputView_);
export default OutputView;

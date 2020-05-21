import React from 'react';
import { connect } from 'react-redux';
import CopyButton from '../CopyButton';
import FormatChooser from "./FormatChooser";
import { State as ReduxState } from '../../redux/store';
import ExportUriView from './ExportUriView';
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
        <ColoredHexStringView />
      </div>
    );
  }
}

export interface Props {
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

const OutputView = connect(mapStateToProps, mapDispatchToProps)(OutputView_);
export default OutputView;

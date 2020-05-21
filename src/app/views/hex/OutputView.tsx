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
      <div className="byteOutput">
        <div className="output_settings table">
          <div className="row">
            <FormatChooser />
            <EndianToggle />
            <CopyButton />
          </div>
        </div>
        {this.props.showExportUri ?
          <ExportUriView /> :
          <ColoredHexStringView />
        }
      </div>
    );
  }
}

export interface Props {
  showExportUri: boolean,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    showExportUri: state.isExportSelected,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

const OutputView = connect(mapStateToProps, mapDispatchToProps)(OutputView_);
export default OutputView;

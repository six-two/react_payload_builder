import React from 'react';
import { connect } from 'react-redux';
import { State as ReduxState } from '../../redux/store';
// import { updatedClipbordManager } from '../../redux/actions';
import { exportToUri } from '../../redux/persistence';
import ClipboardManager from '../../ClipboardManager';

class ExportUriView_ extends React.Component<Props> {
  render() {
    const url = exportToUri();

    return <span>
      You can return to the current state anytime by visiting:
      <br /><br />
      {url}
      <br /><br />
      <b>{"[Warning] This software is still under development, so I might change/break the format sometimes."}</b>
    </span>;
  }
}


export interface Props {
  state: any,
  // updatedClipbordManager: () => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    state: state.persistent,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    // updatedClipbordManager: () => dispatch(updatedClipbordManager()),
  };
};

const ExportUriView = connect(mapStateToProps, mapDispatchToProps)(ExportUriView_);
export default ExportUriView;

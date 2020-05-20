import React from 'react';
import { connect } from 'react-redux';
import { State as ReduxState } from '../../redux/store';
import { setTextToCopy } from '../../redux/actions';
import { exportToUri } from '../../redux/persistence';
import ClipboardManager from '../../ClipboardManager';

class ExportUriView_ extends React.Component<Props> {
  render() {
    const url = exportToUri();
    ClipboardManager.setTextToCopy(url);//TODO can this cause a loop?

    return <span>
      You can return to the current state anytime by visiting:<br /><br />
      {url}
    </span>;
  }
}


export interface Props {
  state: any,
  setTextToCopy: (text: string) => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    state: state.persistent,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setTextToCopy: (text: string) => dispatch(setTextToCopy(text)),
  };
};

const ExportUriView = connect(mapStateToProps, mapDispatchToProps)(ExportUriView_);
export default ExportUriView;

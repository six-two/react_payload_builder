import React from 'react';
import { connect } from 'react-redux';
import { State as ReduxState } from '../../redux/store';
import { setTextToCopy } from '../../redux/actions';
import { serialize } from '../../redux/persistence';
import ClipboardManager from '../../ClipboardManager';

class ExportUriView_ extends React.Component<Props> {
  render() {
    let stateString = serialize(this.props.state);

    // take the current url and set the import param to our current state
    const urlBuilder = new URL(window.location.href);
    urlBuilder.searchParams.set("import", stateString);
    const url = urlBuilder.href;

    ClipboardManager.setTextToCopy(url);//TODO can this cause a loop?

    return <span>
      You can return to the current state anytime by visiting:<br /><br />
      {url}
    </span>;
  }
}


export interface Props {
  state: ReduxState,
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

import React from 'react';
import { connect } from 'react-redux';
import './css/App.scss';
import InputTable from './app/views/input/InputTable';
import OutputView from './app/views/output/OutputView';
import ExportUriView from './app/views/output/ExportUriView';
import { State } from './app/redux/store';


// TODO: next steps
// start using SVG icons (for better privacy + performance)
//   find out how to be complient to the license
// add hexdump settings
//  - improve output line breaks (and use monospaced font)?
//  - better explain the state management to users
//  - (opt) compress the json before base64
//  - Fix names

class App_ extends React.Component<any> {
  render() {
    return (
      <div className="app-root">
        <div id="input">
          <InputTable />
        </div>
        <div id="output">
          <OutputView />
        </div>
        <div id="export-link" className="export-link">
          <ExportUriView />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: any) => {
  return {
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(App_);
export default App;

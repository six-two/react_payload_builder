import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import InputTable from './app/views/hex/InputTable';
import OutputView from './app/views/hex/OutputView';
import ExportUriView from './app/views/hex/ExportUriView';
import * as Str from './app/hex/String';
import { State } from './app/redux/store';



// TODO: next steps
//  - explain that export is a snapshot, reword "session"
//  - use shorter names for export -> also forces me to do validation
//  - (opt) compress the json before base64
//  - Fix names

class App_ extends React.Component<any> {
  render() {
    // <a href="#export-link">Export link</a>
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

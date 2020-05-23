import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import InputTable from './app/views/hex/InputTable';
import OutputView from './app/views/hex/OutputView';
import ExportUriView from './app/views/hex/ExportUriView';
import { State } from './app/redux/store';


// TODO: next steps
//  - improve output line breaks (and use monospaced font)
//      - add hexdump output
//  - a menu to quickly jump to any section? like <a href="#export-link">Export link</a>
// try like https://muzzybear.github.io/react-hexviewer/
//  - explain that export is a snapshot, reword "session"
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

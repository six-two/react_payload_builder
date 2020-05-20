import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import InputTable from './app/views/hex/InputTable';
import OutputView from './app/views/hex/OutputView';
import * as Str from './app/hex/String';
import { State } from './app/redux/store';



// TODO: next steps
//  - improve redux
//  - explain that export is a snapshot, reword "session"
//  - make the copy button update on any change (add a anyChange field?)
//  - use shorter names for export -> also forces me to do validation
//  - (opt) compress the json before base64
//  - store the format before switching to export and export that
//  - Fix names

class App_ extends React.Component<any> {
  render() {
    return (
      <div className="app-root">
        <InputTable
          newItemData={(index: number) => {
            var v = Str.Utils.defaultValues();
            v.pattern = "A".repeat(index + 1);
            return v;
          }} />
        <OutputView />
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

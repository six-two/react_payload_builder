import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import InputTable from './app/views/hex/InputTable';
import OutputView from './app/views/hex/OutputView';
import HexElementView from './app/views/hex/HexElementView';
import * as Str from './app/hex/String';
import { AnyValues, ByteStringBuilder } from './app/hex/ByteStringBuilder';
import { uriSafeDecode } from './app/hex/Escaper';
import { deserialize } from './app/redux/persistence';
import { setState } from './app/redux/actions';
import { State } from './app/redux/store';



// TODO: next steps
//  - make the copy button update on any change (add a anyChange field?)
//  - use shorter names for export -> also forces me to do validation
//  - (opt) compress the json before base64
//  - store the format before switching to export and export that
//  - Also store state of output (little endian, custom output command, output type)
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
    setState: (newState: State) => dispatch(setState(newState)),
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(App_);
export default App;

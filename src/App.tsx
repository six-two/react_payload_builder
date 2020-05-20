import React from 'react';
import './App.scss';
import InputTable from './app/views/hex/InputTable';
import OutputView from './app/views/hex/OutputView';
import HexElementView from './app/views/hex/HexElementView';
import * as Str from './app/hex/String';
import {AnyValues, ByteStringBuilder} from './app/hex/ByteStringBuilder';
import {uriSafeDecode} from './app/hex/Escaper';


// TODO: next steps
//  - Also store state of output (little endian, custom output command, output type)
//  - Fix names

export default class App extends React.Component<any> {
  constructor(props: any) {
    super(props);

  }

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

  parseInitialValuesJson(stateText: string): AnyValues[] {
    try {
      stateText = uriSafeDecode(stateText);
    } catch {
      throw new Error("Base64 decoding failed");
    }
    let parsedJson: any;
    try {
      parsedJson = JSON.parse(stateText);
    } catch{
      throw new Error("JSON decoding failed");
    }
    try {
      let values: AnyValues[] = parsedJson;
      const validator = new ByteStringBuilder();
      for (let i = 0; i < values.length; i++) {
        if (!validator.isValid(values[i])){
          throw new Error(`Element with index ${i} is malformed`);
        }
      }
      return values;
    } catch{
      throw new Error("Your data is corrupted or not compatible with this version of the software");
    }
  }
}

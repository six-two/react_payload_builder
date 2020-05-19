import React from 'react';
import './App.scss';
import InputTable from './app/views/hex/InputTable';
import OutputView from './app/views/hex/OutputView';
import HexElementView from './app/views/hex/HexElementView';
import * as Str from './app/hex/String';
import {AnyValues, Blueprint, ByteStringBuilder} from './app/hex/ByteStringBuilder';
import {uriSafeDecode} from './app/hex/Escaper';


// TODO: next steps
//  - Also store state of output (little endian, custom output command, output type)
//  - Fix names

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    let initialState: AnyValues[];
    try {
      const url = new URL(window.location.href);
      let importParam = url.searchParams.get("import");
      let stateText = importParam || "W3sicGF0dGVybiI6Ij09PSBRdWljayBzdGFydCBpbnN0cnVjdGlvbnMgPT09IiwicGFkZFRvTGVuZ3RoIjoiMTAiLCJ0eXBlIjoiUGFkZGluZyJ9LHsicGF0dGVybiI6IiAtIElucHV0IG5vbiBhc2NpaSBjaGFycyBsaWtlIHRoaXM6IFxceD8_IHdoZXJlID8_IGlzIHRoZSBoZXggY29kZSBvZiB0aGUgY2hhciIsInBhZGRUb0xlbmd0aCI6IjIwIiwidHlwZSI6IlBhZGRpbmcifSx7InR5cGUiOiJTdHJpbmciLCJwYXR0ZXJuIjoiICAgQWxsIG90aGVyIGJhY2tzbGFzaGVzIGFyZSBlc2NhcGVkLiBTbyB1c2UgJ1xceDBhJyBpbnN0ZWFkIG9mICdcXG4nISIsInJlcGVhdENvdW50IjoxfSx7InBhdHRlcm4iOiIgLSBZb3UgY2FuIGFkZCBwYWRkaW5nIGxpa2UgYmVsb3c6IiwicmVwZWF0Q291bnQiOiIxIiwidHlwZSI6IlN0cmluZyJ9LHsidHlwZSI6IlBhZGRpbmciLCJwYXR0ZXJuIjoiXFx4OTAiLCJwYWRkVG9MZW5ndGgiOjEyOH0seyJ0eXBlIjoiU3RyaW5nIiwicGF0dGVybiI6IiAtIFlvdSBjYW4gcHV0IGFuIGFkZHJlc3MgaW50byBtZW1vcnkgbGlrZSBiZWxvdzoiLCJyZXBlYXRDb3VudCI6MX0seyJ0eXBlIjoiSW50ZWdlciIsIm51bWJlclR5cGUiOiIzMiBiaXQiLCJudW1iZXJTdHJpbmciOiIweDEyMzQ1Njc4In0seyJwYXR0ZXJuIjoiIC0gWW91IGNhbiBzZWUgdGhlIG91dHB1dCBpbiB0aGUgYm94IGJlbG93IiwicmVwZWF0Q291bnQiOiIxIiwidHlwZSI6IlN0cmluZyJ9LHsicGF0dGVybiI6IiAgIFRvIHF1aWNrbHkgY29weSBpdCBoaXQgdGhlIGNvcHkgYnV0dG9uIiwicmVwZWF0Q291bnQiOiIxIiwidHlwZSI6IlN0cmluZyJ9XQ";

      initialState = this.parseInitialValuesJson(stateText);
    } catch (e) {
      initialState = [
        "===== Error importing data =====", e.toString(), "Hint: Are you sure you copied the whole url?"
      ].map((text: string) => {
        return {type: "String", pattern: text, repeatCount: 1};
      });
    }

    this.state = { initialValues: initialState, blueprints: [] };
  }

  render() {
    return (
      <div className="app-root">
        <InputTable
          initialValues={this.state.initialValues}
          onChange={this.onListChange}
          entryClass={HexElementView}
          newItemData={(index: number) => {
            var v = Str.Utils.defaultValues();
            v.pattern = "A".repeat(index + 1);
            return v;
          }} />
        <OutputView blueprints={this.state.blueprints} />
      </div>
    );
  }

  onListChange = (newBlueprints: Blueprint[]) => {
    this.setState({ blueprints: newBlueprints });
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

interface State {
  blueprints: Blueprint[],
  initialValues: AnyValues[],
}

import React from 'react';
import './App.scss';
import HexBuilderListView from './app/views/list/ReorderableListView';
import OutputView from './app/views/hex/OutputView';
import HexElementView from './app/views/hex/HexElementView';
import * as Str from './app/hex/String';
import {AnyValues, Blueprint} from './app/hex/ByteStringBuilder';


// TODO: next steps

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    let initialState: AnyValues[];
    try {
      const url = new URL(window.location.href);
      let importParam = url.searchParams.get("import");
      let stateText = importParam ?? "W3sicGF0dGVybiI6IkEiLCJwYWRkVG9MZW5ndGgiOiIxMCIsInR5cGUiOiJQYWRkaW5nIn0seyJwYXR0ZXJuIjoiYSIsInBhZGRUb0xlbmd0aCI6IjIwIiwidHlwZSI6IlBhZGRpbmcifSx7InR5cGUiOiJTdHJpbmciLCJwYXR0ZXJuIjoiQmFja3NsYXNoZXMgYXJlIGVzY2FwZWQuIFNvIHVzZSAnXFx4MGEnIGluc3RlYWQgb2YgJ1xcbichIiwicmVwZWF0Q291bnQiOjF9LHsidHlwZSI6IlBhZGRpbmciLCJwYXR0ZXJuIjoiXFx4OTAiLCJwYWRkVG9MZW5ndGgiOjEyOH0seyJ0eXBlIjoiU3RyaW5nIiwicGF0dGVybiI6IllvdSBjYW4gcHV0IGFuIGFkZHJlc3MgaW50byBtZW1vcnkgbGlrZSBiZWxvdzoiLCJyZXBlYXRDb3VudCI6MX0seyJ0eXBlIjoiSW50ZWdlciIsIm51bWJlclR5cGUiOiIzMiBiaXQiLCJudW1iZXJTdHJpbmciOiIweDEyMzQ1Njc4In1d"

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
        <h1>Payload builder</h1>
        <HexBuilderListView
          initialValues={this.state.initialValues}
          onChange={this.onListChange}
          entryClass={HexElementView}
          newItemData={(index: number) => {
            var v = Str.Utils.defaultValues();
            v.repeatCount = index + 1;
            return v;
          }} />
        <h2>Output</h2>
        <OutputView blueprints={this.state.blueprints} />
      </div>
    );
  }

  onListChange = (newBlueprints: Blueprint[]) => {
    this.setState({ blueprints: newBlueprints });
  }

  parseInitialValuesJson(stateText: string): AnyValues[] {
    try {
      stateText = atob(stateText);
    } catch{
      throw "Base64 decoding failed";
    }
    let parsedJson: any;
    try {
      parsedJson = JSON.parse(stateText);
    } catch{
      throw "JSON decoding failed";
    }
    try {
      let values: AnyValues[] = parsedJson;
      return values;
    } catch{
      throw "Your data is corrupted or not compatible with this version of the software";
    }
  }
}

interface State {
  blueprints: Blueprint[],
  initialValues: AnyValues[],
}

import React from 'react';
import './App.scss';
import HexBuilderListView from './app/views/list/ReorderableListView';
import OutputView from './app/views/hex/OutputView';
import HexElementView from './app/views/hex/HexElementView';
import * as Str from './app/hex/String';

// TODO: next steps
//  - Improve bytestring (make immuteable, add performant concat and repeat methods)
//  - Add ex-/importing state via a url parameter
//  - Use above feature for initial state

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    const intro = {
      type: "String", pattern: "Build your own attack string", repeatCount: 1,
    };
    const shellcode = {
      type: "String", pattern: "Input non ascii chars like this: \\x11\\x22\\x33\\x44", repeatCount: 1,
    };
    const intro2 = {
      type: "String", pattern: "Backslashes are escaped. So use '\\x0a' instead of '\\n'!", repeatCount: 1,
    };
    const padding = {
      type: "Padding", pattern: "\\x90", paddToLength: 128,
    }
    const help_address = {
      type: "String", pattern: "You can put an address into memory like below:", repeatCount: 1,
    };
    const address = {
      type: "Integer", numberType: "32 bit", numberString: "0x12345678",
    }
    const initialValues = [intro, shellcode, intro2, padding, help_address, address];
    this.state = { initialValues: initialValues, blueprints: [] };
  }

  render() {
    return (
      <div className="app-root">
        <HexBuilderListView
          initialValues={this.state.initialValues}
          onChange={this.onListChange}
          entryClass={HexElementView}
          newItemData={(index: number) => {
            var v: any = Str.Utils.defaultValues();
            v.repeatCount = index + 1;
            return v;
          }} />
        <OutputView blueprints={this.state.blueprints} />
      </div>
    );
  }

  onListChange = (newBlueprints: Blueprint[]) => {
    this.setState({ blueprints: newBlueprints });
  }
}

interface State {
  blueprints: Blueprint[],
  initialValues: any[],
}

interface Blueprint {
  key: number,
  data: any,
}

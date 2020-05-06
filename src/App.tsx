import React from 'react';
import './App.css';
import HexBuilderListView from './app/views/list/ReorderableListView';
import OutputView from './app/views/hex/OutputView';
import HexElementView from './app/views/hex/HexElementView';
import * as Str from './app/hex/String';

// TODO: next steps
//  - show little endian checkbox if at least one integer is selected
//  - CSS

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { blueprints: [] }
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const colors: string[] = ["red", "green", "blue"]
    return (
      <div className="app-root">
        <a href="http://six-two.github.io/react_payload_builder">
          View the Gitlab Pages version
        </a>
        <HexBuilderListView
          onChange={this.onChange}
          entryClass={HexElementView}
          newItemData={(index: number) => {
            var v: any = Str.Utils.defaultValues();
            v.repeatCount = index + 1;
            return v;
          }} />
        <OutputView blueprints={this.state.blueprints} colors={colors}
        />
      </div>
    );
  }

  onChange(newBlueprints: Blueprint[]) {
    this.setState({ blueprints: newBlueprints });
  }
}

interface State {
  blueprints: Blueprint[],
}

interface Blueprint {
  key: number,
  data: any,
}

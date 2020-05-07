import React from 'react';
import './App.scss';
import HexBuilderListView from './app/views/list/ReorderableListView';
import OutputView from './app/views/hex/OutputView';
import HexElementView from './app/views/hex/HexElementView';
import * as Str from './app/hex/String';

// TODO: next steps
//  - CSS

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { blueprints: [] }
  }

  render() {
    return (
      <div className="app-root">
        <a href="http://six-two.github.io/react_payload_builder">
          View the Gitlab Pages version
        </a>
        <HexBuilderListView
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
}

interface Blueprint {
  key: number,
  data: any,
}

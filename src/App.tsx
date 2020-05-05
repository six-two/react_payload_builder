import React from 'react';
import './App.css';
import HexBuilderListView from './app/views/list/ReorderableListView'
import HexStringView from './app/views/hex/HexStringView'
import HexElementView from './app/views/hex/HexElementView'
import PaddingEditView from './app/views/hex/PaddingEditView'


export default class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {blueprints: []}
        this.onChange = this.onChange.bind(this);
    }

    render() {
      const colors: string[] = ["red", "green", "blue"]
      return (
          <div>
          <HexBuilderListView
              onChange={this.onChange}
              entryClass={HexElementView}
              newItemData={(index: number) => {
                  var v: any = PaddingEditView.defaultValues;
                  v.number = index + 1;
                  return v;
              }} />
          <HexStringView blueprints={this.state.blueprints} colors={colors} />
          </div>
      );
    }

  onChange(newBlueprints: Blueprint[]) {
    const newState: State = Object.assign({}, this.state, {blueprints: newBlueprints});
    this.setState(newState);
  }
}

interface State {
  blueprints: Blueprint[],
}

interface Blueprint {
  key: number,
  data: any,
}

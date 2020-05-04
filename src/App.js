import React from 'react';
import './App.css';
import HexBuilderListView from './app/views/list/ReorderableListView'
import HexStringView from './app/views/hex/HexStringView'
import HexElementView from './app/views/hex/HexElementView'
import PaddingEditView from './app/views/hex/PaddingEditView'


class App extends React.Component {
    constructor() {
        super();
        this.state = {blueprints: []}
        this.onChange = this.onChange.bind(this);
    }

    render() {
    const colors = ["red", "green", "blue"]
    return (
        <div>
        <HexBuilderListView
            onChange={this.onChange}
            entryClass={HexElementView}
            newItemData={(index) => {
                var v = PaddingEditView.defaultValues;
                v.number = index + 1;
                return v;
            }} />
        <HexStringView blueprints={this.state.blueprints} colors={colors} />
        </div>
    );
  }

  onChange(newBlueprints) {
    const newState = Object.assign({}, this.state, {blueprints: newBlueprints});
    this.setState(newState);
  }
}

export default App;

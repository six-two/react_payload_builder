import React from 'react';
import './App.css';
import HexBuilderListView from './app/HexBuilderListView'
import HexStringView from './app/HexStringView'


class HelloMessage extends React.Component {
    constructor() {
        super();
        this.state = {blueprints: []}
        this.onChange = this.onChange.bind(this);
    }

  render() {
    const colors = ["red", "green", "blue"]
    return (
      <div>
        <HexBuilderListView onChange={this.onChange} />
        <HexStringView blueprints={this.state.blueprints} colors={colors} />
      </div>
    );
  }

  onChange(newBlueprints) {
    const newState = Object.assign({}, this.state, {blueprints: newBlueprints});
    this.setState(newState);
  }
}


const App = HelloMessage

export default App;

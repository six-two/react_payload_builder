import React from 'react';
import './App.css';
import HexBuilderListView from './app/HexBuilderListView'
import HexStringView from './app/HexStringView'
//import ByteString from './app/HexString';


class App extends React.Component {
    constructor() {
        super();
        this.state = {blueprints: []}
        this.onChange = this.onChange.bind(this);

//        var test = new ByteString("\\x12a\\x66\\x55\\a\\x89");
//        console.log("%d | %o", test.length, test.bytes);
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

export default App;

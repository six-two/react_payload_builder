import React from 'react';
import './App.css';
import HexElementView from './app/HexElementView'
import HexBuilderListView from './app/HexBuilderListView'
import HexBuilderStore from './app/HexBuilderStore'
import ChooseOptionView from './app/ChooseOptionView'

var obj = {
count_bytes: function(string) {
    var i = 0;
    var byte_count = 0;
    while (i < string.length){
        if (string[i] === "\\" && i + 1 < string.length && string[i+1] === "x"){
            i += 4;
        } else {
            i += 1;
        }
        byte_count += 1;
    }
    return byte_count;
}
}

class HelloMessage extends React.Component {
    constructor() {
    super();
    this.state = {store: new HexBuilderStore()};
    this.state.store.add();
    this.state.store.add();
    }

  render() {
    return (
      <div>
        Hello World: {obj.count_bytes("abcd\\x55efg")}
        <ChooseOptionView options={["a", "b", "c", "def", "g, h, i"]} onChange={console.log} />
        <HexElementView key={0} store={this.state.store} index={0} type="Padding" />
        <HexBuilderListView store={this.state.store} />
      </div>
    );
  }
}


const App = HelloMessage

export default App;

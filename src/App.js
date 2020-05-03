import React from 'react';
import './App.css';
import HexBuilderListView from './app/HexBuilderListView'
import Padding from './app/hextypes/Padding'

//var obj = {
//count_bytes: function(string) {
//    var i = 0;
//    var byte_count = 0;
//    while (i < string.length){
//        if (string[i] === "\\" && i + 1 < string.length && string[i+1] === "x"){
//            i += 4;
//        } else {
//            i += 1;
//        }
//        byte_count += 1;
//    }
//    return byte_count;
//}
//}

class HelloMessage extends React.Component {
    constructor() {
        super();
        this.state = { entries: [
                {key: 0, data: Padding.defaultValues},
                {key: 1, data: Padding.defaultValues}
            ], a: 0};
        this.onChange = this.onChange.bind(this);
    }

  render() {
    return (
      <div>
        <HexBuilderListView entries={this.state.entries} onChange={this.onChange} />
      </div>
    );
  }

  onChange() {
    console.log("App go onChange");
    this.setState(Object.assign({}, this.state, {a: this.state.a + 1}));
  }
}


const App = HelloMessage

export default App;

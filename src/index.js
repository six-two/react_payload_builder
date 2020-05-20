import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from './app/redux/store';
import {tryImportFromUri, tryImportFromString} from './app/redux/persistence';

function importData(){
  if (!tryImportFromUri()) {
    console.info("Falling back on default values");
    const defaultValues = "eyJpc0xpdHRsZUVuZGlhbiI6dHJ1ZSwiZm9ybWF0Ijp7InNlbGVjdGVkIjoiZXhwb3J0IHRoaXMgc2Vzc2lvbiIsInZhbHVlIjoiWW91IHNob3VsZCBuZXZlciBzZWUgdGhpcyBtZXNzYWdlISAlcyIsImN1c3RvbSI6InlvdXJDb21tYW5kIC0tZmxhZ3MgJyVzJyJ9LCJlbnRyaWVzIjpbeyJwYXR0ZXJuIjoiQSIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJwYXR0ZXJuIjoiQUEiLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9LHsicGF0dGVybiI6IkFBQSIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJwYXR0ZXJuIjoiQUFBQSIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn1dfQ";//TODO
    if (!tryImportFromString(defaultValues)) {
      throw new Error("[Bug/Compat breaking change] Parsing hardcoded initial state failed");
    }
  }
}

// importData();

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

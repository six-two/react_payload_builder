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
    const defaultValues = "eyJsZSI6dHJ1ZSwiZiI6eyJzIjoicmF3IiwidiI6IiV4IiwiYyI6InlvdXJDb21tYW5kIC0tZmxhZ3MgJyV4JyJ9LCJsIjpbeyJwYXR0ZXJuIjoidGVzdDEyMyIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJudW1iZXJTdHJpbmciOiIweDExMjIzMzQ0IiwibnVtYmVyVHlwZSI6IjMyIGJpdCIsInR5cGUiOiJJbnRlZ2VyIn1dfQ..";
    if (!tryImportFromString(defaultValues)) {
      alert("[Bug/Compat breaking change] Parsing hardcoded initial state failed");
    }
  }
}

importData();

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

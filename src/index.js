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
    const defaultValues = "eyJsZSI6dHJ1ZSwiZiI6eyJzIjoicmF3IiwidiI6IiV4IiwiYyI6InlvdXJDb21tYW5kIC0tZmxhZ3MgJyV4JyJ9LCJsIjpbeyJwYXR0ZXJuIjoiPT09IFF1aWNrIHN0YXJ0IGluc3RydWN0aW9ucyA9PT0iLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9LHsicGF0dGVybiI6IiAtIElucHV0IG5vbiBhc2NpaSBjaGFycyBsaWtlIHRoaXM6IFxceD8_IHdoZXJlID8_IGlzIHRoZSBoZXggY29kZSBvZiB0aGUgY2hhciIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJwYXR0ZXJuIjoiICAgQWxsIG90aGVyIGJhY2tzbGFzaGVzIGFyZSBlc2NhcGVkLiBTbyB1c2UgJ1xceDBhJyBpbnN0ZWFkIG9mICdcXG4nISIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJwYXR0ZXJuIjoiIC0gWW91IGNhbiBhZGQgcGFkZGluZyBsaWtlIGJlbG93OiIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJwYXR0ZXJuIjoiXFx4OTAiLCJwYWRkVG9MZW5ndGgiOiIyNTYiLCJ0eXBlIjoiUGFkZGluZyJ9LHsicGF0dGVybiI6IiAtIFlvdSBjYW4gcHV0IGFuIGFkZHJlc3MgaW50byBtZW1vcnkgbGlrZSBiZWxvdzoiLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9LHsibnVtYmVyU3RyaW5nIjoiMHgxMjM0NTY3OCIsIm51bWJlclR5cGUiOiIzMiBiaXQiLCJ0eXBlIjoiSW50ZWdlciJ9LHsicGF0dGVybiI6IiAtIFlvdSBjYW4gc2VlIHRoZSBvdXRwdXQgaW4gdGhlIGJveCBiZWxvdyIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJwYXR0ZXJuIjoiICAgVG8gcXVpY2tseSBjb3B5IGl0IGhpdCB0aGUgY29weSBidXR0b24iLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9XX0";
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

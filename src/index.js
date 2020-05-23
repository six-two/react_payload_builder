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
    const defaultValues = "eyJsZSI6dHJ1ZSwiZiI6eyJzIjoiaGV4ZHVtcCIsInYiOiIlaCIsImMiOiJ5b3VyQ29tbWFuZCAtLWZsYWdzICcleCcifSwibCI6W3sicGF0dGVybiI6Ij09PSBRdWljayBzdGFydCBpbnN0cnVjdGlvbnMgPT09IiwicmVwZWF0Q291bnQiOjEsInR5cGUiOiJTdHJpbmcifSx7InBhdHRlcm4iOiIgLSBJbnB1dCBub24gYXNjaWkgY2hhcnMgbGlrZSB0aGlzOiBcXHg_PyB3aGVyZSA_PyBpcyB0aGUgaGV4IGNvZGUgb2YgdGhlIGNoYXIiLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9LHsicGF0dGVybiI6IiAgIEFsbCBvdGhlciBiYWNrc2xhc2hlcyBhcmUgZXNjYXBlZC4gU28gdXNlICdcXHgwYScgaW5zdGVhZCBvZiAnXFxuJyEiLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9LHsicGF0dGVybiI6IiAtIFlvdSBjYW4gYWRkIHBhZGRpbmcgbGlrZSBiZWxvdzoiLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9LHsicGF0dGVybiI6IlxceDkwIiwicGFkZFRvTGVuZ3RoIjoiMHgxMDAiLCJ0eXBlIjoiUGFkZGluZyJ9LHsicGF0dGVybiI6IiAtIFlvdSBjYW4gcHV0IGFuIGFkZHJlc3MgaW50byBtZW1vcnkgbGlrZSBiZWxvdzoiLCJyZXBlYXRDb3VudCI6MSwidHlwZSI6IlN0cmluZyJ9LHsibnVtYmVyU3RyaW5nIjoiMHgxMjM0NTY3OCIsIm51bWJlclR5cGUiOiIzMiBiaXQiLCJ0eXBlIjoiSW50ZWdlciJ9LHsicGF0dGVybiI6IiAtIFlvdSBjYW4gc2VlIHRoZSBvdXRwdXQgaW4gdGhlIGJveCBiZWxvdyIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn0seyJwYXR0ZXJuIjoiICAgVGhlcmUgYXJlIG11bHRpcGxlIHN1cHBvcnRlZCBvdXRwdXQgZm9ybWF0cyIsInJlcGVhdENvdW50IjoxLCJ0eXBlIjoiU3RyaW5nIn1dfQ";
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

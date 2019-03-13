import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";
import reducer from "./reducer";
import { Actions, InitialState } from "./constants";
import SavedDocuments from "./components/SavedDocuments";
function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const ReducerContext = React.createContext({ state, dispatch });
  console.log(state);
  return (
    <div className="App">
      <SavedDocuments documentNames={state.availableDocuments} />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

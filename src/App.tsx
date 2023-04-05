import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./component/Button/Button";

function App() {
  return (
    <div className="App">
      <Button varient="secondary" children="button" />
    </div>
  );
}

export default App;

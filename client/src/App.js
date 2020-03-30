import React from "react";
import "./App.css";
import Users from "./Components/Users";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Users} />
      </BrowserRouter>
    </div>
  );
}

export default App;

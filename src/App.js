import React from "react";
import "./Assets/App.scss";

import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <div className="App">
      <h1 style={{ marginBottom: "40px" }}>Server Path Formatter</h1>
      <SearchBar />
    </div>
  );
}

export default App;

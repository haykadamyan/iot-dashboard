import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">IoT Sensors Dashboard</h1>
        <label className="app__label">
          Show only connected sensors:
          <input type="checkbox" className="app__checkbox" />
        </label>
      </header>
    </div>
  );
}

export default App;

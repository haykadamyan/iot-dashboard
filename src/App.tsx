import React, { useEffect, useRef } from "react";
import "./App.css";

const wsURL = "ws://localhost:8000";

function App() {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(wsURL);

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket");
    };

    ws.current.onmessage = (event) => {
      const sensorData = JSON.parse(event.data);
      console.log(sensorData);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.current.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `Closed cleanly, code=${event.code}, reason=${event.reason}`,
        );
      } else {
        console.error("Connection died");
      }
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

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

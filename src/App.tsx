import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import Sensor from "components/Sensor";

const wsURL = "ws://localhost:8000";

interface SensorData {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
}

interface WebSocketCommand {
  command: "connect" | "disconnect";
  id: string;
}

function App() {
  const [showOnlyConnected, setShowOnlyConnected] = useState<boolean>(false);
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const setupWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(wsURL);

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket");
    };

    ws.current.onmessage = (event) => {
      const sensorData = JSON.parse(event.data);
      setSensors((prevState) => {
        const sensorIndex = prevState.findIndex(
          (sensor) => sensor.id === sensorData.id,
        );
        if (sensorIndex > -1) {
          const updatedSensors = [...prevState];
          updatedSensors[sensorIndex] = sensorData;
          return updatedSensors;
        } else {
          return [...prevState, sensorData];
        }
      });
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.current.onclose = (event) => {
      if (!event.wasClean) {
        console.error("Connection died");
      }
    };
  };

  useEffect(() => {
    setupWebSocket();

    const resyncInterval = setInterval(() => {
      // reset to trigger a resync.
      if (ws.current) {
        ws.current.close();
        setupWebSocket();
      }
    }, 3000);
    return () => {
      clearInterval(resyncInterval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowOnlyConnected(e.target.checked);
    },
    [],
  );

  const toggleConnection = useCallback(
    (id: string, action: "connect" | "disconnect") => {
      const payload: WebSocketCommand = {
        id,
        command: action,
      };
      ws.current?.send(JSON.stringify(payload));
    },
    [],
  );

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">IoT Sensors Dashboard</h1>
        <label className="app__label">
          Show only connected sensors:
          <input
            type="checkbox"
            className="app__checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
      </header>
      <main className="app__main">
        {sensors
          .filter((sensor) => !showOnlyConnected || sensor.connected)
          .map((sensor) => (
            <Sensor
              key={sensor.id}
              data={sensor}
              toggleConnection={toggleConnection}
            />
          ))}
      </main>
    </div>
  );
}

export type { SensorData };
export default App;

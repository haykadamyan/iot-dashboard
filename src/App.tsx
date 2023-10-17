import React, { useState, useCallback } from "react";
import "./App.css";

import Sensor from "components/Sensor";
import { updateSensorsArray } from "./helpers/sensorsHelper";
import useWebSocket from "./hooks/useWebSocket";
import config from "./config";

const wsURL = config.wsURL;

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

  const handleMessage = useCallback((event: MessageEvent) => {
    const sensorData = JSON.parse(event.data);

    setSensors((prevState) => {
      const existingSensor = prevState.find(
        (sensor) => sensor.id === sensorData.id,
      );

      if (event.data === JSON.stringify(existingSensor)) return prevState;

      return updateSensorsArray(prevState, sensorData);
    });
  }, []);

  const ws = useWebSocket(wsURL, handleMessage, 3000);

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

import React from "react";
import { SensorData } from "App";

interface SensorProps {
  data: SensorData;
  toggleConnection: (id: string, action: "connect" | "disconnect") => void;
}

const Sensor: React.FC<SensorProps> = ({ data, toggleConnection }) => {
  const { id, name, connected, value, unit } = data;

  return (
    <div
      className={`sensor ${
        connected ? "sensor--connected" : "sensor--disconnected"
      }`}
    >
      <h2 className="sensor__title">{name}</h2>
      <p className="sensor__value">
        {value} {unit}
      </p>
      <button
        className={`sensor__button sensor__button--${
          connected ? "connected" : "disconnected"
        }`}
        onClick={() =>
          toggleConnection(id, connected ? "disconnect" : "connect")
        }
      >
        {data.connected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
};

export default Sensor;

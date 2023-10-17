import { SensorData } from "../App";

function updateSensorsArray(
  prevState: SensorData[],
  updatedSensor: SensorData,
): SensorData[] {
  const sensorIndex = prevState.findIndex(
    (sensor) => sensor.id === updatedSensor.id,
  );
  if (sensorIndex > -1) {
    const updatedSensors = [...prevState];
    updatedSensors[sensorIndex] = updatedSensor;
    return updatedSensors;
  } else {
    return [...prevState, updatedSensor];
  }
}

export { updateSensorsArray };

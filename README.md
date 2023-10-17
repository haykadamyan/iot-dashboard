# IoT Sensors Dashboard

The IoT Sensors Dashboard provides a real-time view of various sensor data, like temperature, humidity, and wind speed. The dashboard connects to a WebSocket server to fetch continuous data updates. The client has been optimized to handle rapid streams of data and minimize re-renders for better performance.

## Features

- **Real-time Data Display**: Sensor data updates in real-time.
- **Optimized Data Handling**: Introduces minimal re-renders by leveraging advanced React hooks and data handling strategies.
- **WebSocket Connection**: Uses WebSocket to fetch continuous sensor updates.
- **Sensor Control**: Allows users to manually connect or disconnect sensors.
- **Filtering**: An option to show only connected sensors.

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm/yarn

## Getting Started

1. **Clone the Repository**
    ```bash
    git clone https://github.com/haykadamyan/iot-dashboard.git
    cd iot-dashboard
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Start the Development Server**
    ```bash
    npm start
    ```

The app should now be running on `http://localhost:3000`.

## Configuration

The WebSocket server's URL is configurable through the `REACT_APP_WS_URL` environment variable. Update the `.env` file to point to your WebSocket server if it's different from the default.



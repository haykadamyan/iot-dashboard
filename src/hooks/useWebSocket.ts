import { useRef, useEffect } from "react";

const useWebSocket = (
  url: string,
  onMessage: (message: MessageEvent) => void,
  resyncIntervalDuration: number = 3000,
) => {
  const ws = useRef<WebSocket | null>(null);

  const setupWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket");
    };

    ws.current.onmessage = onMessage;

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.current.onclose = (event) => {
      if (!event.wasClean) {
        console.error("Connection died");
        setupWebSocket();
      }
    };
  };

  useEffect(() => {
    setupWebSocket();

    const resyncInterval = setInterval(() => {
      setupWebSocket();
    }, resyncIntervalDuration);

    return () => {
      clearInterval(resyncInterval);
      if (ws.current) ws.current.close();
    };
  }, [url, onMessage, resyncIntervalDuration]);

  return ws;
};

export default useWebSocket;

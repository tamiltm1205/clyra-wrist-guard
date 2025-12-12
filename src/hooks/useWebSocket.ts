import { useState, useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  message: string;
  timestamp: string;
  location?: { lat: number; long: number };
}

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const connect = () => {
    try {
      ws.current = new WebSocket(url);
      
      ws.current.onopen = () => {
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages(prev => [data, ...prev.slice(0, 9)]);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
      };

      ws.current.onerror = () => {
        setIsConnected(false);
      };
    } catch (error) {
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [url]);

  return { isConnected, messages, connect, disconnect };
};
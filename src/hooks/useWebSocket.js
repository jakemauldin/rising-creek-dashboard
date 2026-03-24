import { useState, useEffect, useCallback, useRef } from "react";

export function useWebSocket(path = "/ws") {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const wsRef = useRef(null);
  const retriesRef = useRef(0);
  const listenersRef = useRef(new Map());

  const connect = useCallback(() => {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    const url = `${protocol}//${location.host}${path}`;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        retriesRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          setLastMessage(msg);
          // Notify type-specific listeners
          const handlers = listenersRef.current.get(msg.type);
          if (handlers) handlers.forEach((fn) => fn(msg));
        } catch {
          setLastMessage({ type: "raw", data: event.data });
        }
      };

      ws.onclose = () => {
        setConnected(false);
        const delay = Math.min(30000, 1000 * Math.pow(2, retriesRef.current));
        retriesRef.current++;
        setTimeout(connect, delay);
      };

      ws.onerror = () => ws.close();
    } catch {
      // WebSocket unavailable — running without backend
    }
  }, [path]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.onclose = null; // prevent reconnect on unmount
        wsRef.current.close();
      }
    };
  }, [connect]);

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  const on = useCallback((type, handler) => {
    if (!listenersRef.current.has(type)) {
      listenersRef.current.set(type, new Set());
    }
    listenersRef.current.get(type).add(handler);
    return () => listenersRef.current.get(type)?.delete(handler);
  }, []);

  return { connected, lastMessage, send, on };
}

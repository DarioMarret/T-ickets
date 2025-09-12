import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function useSocket(url, options = {}) {
    const socketRef = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io('https://api.t-ickets.com/', {
            path: '/mikroti/socket.io',
            transports: ["websocket"],
            reconnection: true,
            ...options,
        });

        socketRef.current = socket;

        // manejar estado de conexión
        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));

        return () => {
            socket.disconnect();
        };
    }, [url]);

    // función para emitir eventos
    const emit = (event, data) => {
        if (socketRef.current) {
            socketRef.current.emit(event, data);
        }
    };

    // función para escuchar eventos
    const on = (event, callback) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    };

    // función para dejar de escuchar
    const off = (event, callback) => {
        if (socketRef.current) {
            socketRef.current.off(event, callback);
        }
    };

    return {
        socket: socketRef.current,
        connected,
        emit,
        on,
        off,
    };
}

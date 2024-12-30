import socketio from "socket.io-client";
import React from 'react'

export const socket = socketio.connect(String(process.env.REACT_APP_SOCKET_IO));
export const SocketContext = React.createContext();


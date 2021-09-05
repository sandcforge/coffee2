import React, { createContext } from 'react';
import io from 'socket.io-client';
import { APP_CONST } from '../constants';
import { useDispatch } from 'react-redux';
import { actionLaunchRocket } from '../redux/actions';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = (message) => {
    socket.emit('C2H', JSON.stringify(message));
  }

  if (!socket) {
    socket = io.connect('/');
    socket.on("H2C", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(actionLaunchRocket(payload.message));
    })

    ws = {
      socket: socket,
      sendMessage
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}
import { useEffect } from 'react';
import socket from './socket';

const useSocket = (eventName: string, callback: (data: any) => void) => {
  useEffect(() => {
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);
};

export default useSocket;

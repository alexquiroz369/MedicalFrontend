import io from 'socket.io-client';

const socket = io(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}`, { transports: ['websocket'] });

export default socket;

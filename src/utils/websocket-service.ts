// import { io, Socket } from 'socket.io-client';

// const SOCKET_SERVER_URL = 'https://percievenowchat2.azurewebsites.net/ws/chat'; // Replace with your WebSocket server URL

// let socket: Socket;

// function initSocketEvents() {
//   socket.on('connect', () => {
//     console.log('Connected to WebSocket server');
//   });

//   // Example: Handle custom event from server
//   socket.on('messageFromServer', (data: any) => {
//     console.log('Message from server:', data);
//     // Handle received data as needed
//   });
// }

// export function connect() {
//   socket = io(SOCKET_SERVER_URL);
//   initSocketEvents();
//   console.log('Connected to WebSocket server!');
// }

// export function sendMessage(message: string) {
//   socket.emit('messageFromClient', message);
// }

// export function disconnect() {
//   socket.disconnect();
// }
export function w() {
  console.log("s");
}

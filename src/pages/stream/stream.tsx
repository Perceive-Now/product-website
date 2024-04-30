// // Chat.js

// import axios from 'axios';
// import React, { useState, useEffect, useCallback } from 'react';
// import io from 'socket.io-client';

// const socket = io('https://percievenowchat2.azurewebsites.net/gautam'); // Connect to your server

// const Stream = () => {
//   // const [messages, setMessages] = useState<any>([]);
//   // const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     socket.on('message', (message) => {
//       response()
//       // setMessages((prevMessages: any) => [...prevMessages, message]);
//     });
//   }, []);

//   const response = useCallback(async () => {
//     try {

//       const response = await axios.get(
//         `https://percievenowchat2.azurewebsites.net/gautam`,
//       );

//       console.log(response)
//     } catch (e: any) {
//       console.log(e)
//     }

//   }, [])

//   // useEffect(() => {
//   //   response()
//   //   // return response.data.products;

//   // }, [response])

//   // const handleMessageSend = () => {
//   //   if (inputValue.trim() !== '') {
//   //     const message = { text: inputValue, timestamp: new Date() };
//   //     socket.emit('message', message);
//   //     setInputValue('');
//   //   }
//   // };

//   return (
//     <div>
//       {/* <div>
//         {messages.map((message: any, index: any) => (
//           <div key={index}>{message.text}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button onClick={handleMessageSend}>Send</button> */}
//     </div>
//   );
// };

// export default Stream;

import React from "react";

const stream = () => {
  return <div>stream</div>;
};

export default stream;

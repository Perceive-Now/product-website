// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { AppConfig } from "src/config/app.config";
// import { useAppDispatch } from "src/hooks/redux";
// import { saveMarketChat } from "src/stores/know-now1";

// const ChatComponent = () => {
//   const dispatch = useAppDispatch();
//   const wsUri = "wss://percievenowchat2.azurewebsites.net/ws/chat?user_id=12&thread_id=12"; // Replace with your actual server address and port

//   const [searching, setSearching] = useState(false);
//   const [websocket, setWebsocket] = useState<any>(null);
//   const [message, setMessage] = useState("");
//   const [messageArea, setMessageArea] = useState("");

//   useEffect(() => {
//     const ws = new WebSocket(wsUri) as any;

//     ws.onopen = () => {
//       console.log("Connected to WebSocket server!");
//     };

//     ws.onmessage = (ev: any) => {
//       const newMessage = ev.data;
//       console.log(ev);
//       setMessageArea((prev) => prev + newMessage);
//     };

//     ws.onerror = (ev: any) => {
//       console.error("WebSocket error:", ev);
//     };

//     setWebsocket(ws);

//     // Cleanup function to close the WebSocket when the component unmounts
//     return () => {
//       ws.close();
//     };
//   }, [wsUri]);

//   const handleSend = () => {
//     if (websocket) {
//       const question = {
//         query: message,
//         thread_id: 1, // Replace with an appropriate thread ID if needed
//         user_id: 23,
//       };
//       websocket.send(JSON.stringify(question));
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <div id="messageArea" className="w-full" dangerouslySetInnerHTML={{ __html: messageArea }} />

//       <input
//         type="text"
//         className="block w-full"
//         id="messageInput"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button id="sendButton" onClick={handleSend}>
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatComponent;

import React from "react";

const ChatTest = () => {
  return <div>ChatTest</div>;
};

export default ChatTest;

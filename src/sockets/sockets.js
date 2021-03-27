import io from "socket.io-client";
let socket

export const initiateSocket = (room) => {
  socket = io("http://localhost:4000", { transports: ["websocket"] });
  console.log(`Connecting`);
  if (socket && room) socket.emit("join", room);
};
export const disconnectSocket = () => {
  console.log("Disconnecting");
  if (socket) socket.disconnect();
};
export const enterChat = (data) => {
  if (!socket) return;
  socket.on("chat", (message) => {
    console.log("message reieved");
    return data(null, message);
  });
};
export const sendMessage = (room, message) => {
  if (socket) socket.emit("chat", { message, room });
};

//   const addRoom = () => {
//     if(createRoom){
//     sendRoom()
//     setCreateRoom()
//     }
//   }

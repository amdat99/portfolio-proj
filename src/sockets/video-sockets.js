import io from "socket.io-client";
let socket;

export const initiateVidSocket = (room) => {
  // socket = io("https://aamirproject-api.herokuapp.com", {
  socket = io("http://localhost:4000/videosokets", {
    transports: ["websocket"],
  });
  console.log(`succseful connectiopnf`);
  if (socket && room) socket.emit("join", room);
};
export const disconnectVidSocket = () => {
  console.log("Disconnecting");
  if (socket) socket.disconnect();
};

export const enterTest = (data) => {
  if (!socket) return;
  socket.on("connection-s", (message) => {
    console.log("message reieved");
    return data(null, message);
  });
};

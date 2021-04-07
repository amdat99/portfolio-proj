import io from "socket.io-client";
let socket;

export const initiateSocket = (room) => {
  socket = io("https://aamirproject-api.herokuapp.com", {
  // socket = io("http://localhost:4000/", {
    transports: ["websocket"],
  });
  console.log(`Connecting`);
  if (socket && room) socket.emit("join", room);
};
export const disconnectSocket = () => {
  console.log("Disconnecting");
  if (socket) socket.disconnect();
};

export const testSocket = (data) => {
  socket.on("success", (message) => {
    return data(null, message);
  });
};

export const enterChat = (data) => {
  if (!socket) return;
  socket.on("chat", (message) => {
    console.log("message reieved");
    return data(null, message);
  });
};

export const sendMessage = (room, message) => {
  console.log("message sent");
  if (socket) socket.emit("chat", { message, room });
};


export const enterOnMessage = (data) => {
  if (!socket) return;
  socket.on("onmessage", (message) => {
    console.log("call started");
    return data(null, message);
  });
};



export const sendMsgRequest = () => {
  console.log(" fetching messages");
  if (socket) socket.emit("onmessage");
}


export const enterCall = (data) => {
  if (!socket) return;
  socket.on("begincall", (profileId) => {
    console.log("call started");
    return data(null, profileId);
  });
};



export const sendProfile = (profileId) => {
  console.log("works");
  if (socket) socket.emit("begincall", { profileId });
};

export const enterSDP = (data) => {
  if (!socket) return;
  socket.on("offer", (sdp) => {
    console.log("s received");
    return data(null, sdp);
  });
};

export const sendSDP = (sdp, videoId) => {
  socket.emit("offer", { sdp, videoId });
  console.log("offer sent");
};



export const enterCand = (data) => {
  if (!socket) return;
  socket.on("oncandidate", (candidate) => {
    console.log(" got candidate");
    return data(null, candidate);
  });
};

export const sendCand = (candidate, videoId) => {
  console.log("candidate sent");
  if (socket) socket.emit("oncandidate", { candidate });
};

export const checkJoined = (data) => {
  if (!socket) return;
  socket.on("checkjoined", (videoId) => {
    console.log(" offer ready to be sent");
    return data(null, videoId);
  });
};

export const sendId = (videoId) => {
  console.log("id sent");
  if (socket) socket.emit("checkjoined", { videoId });
};

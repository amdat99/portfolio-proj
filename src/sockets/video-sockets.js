import io from "socket.io-client";
let socket;

export const initiateSocket = (room) => {
    socket = io("https://aamirproject-api.herokuapp.com", { transports: ["websocket"] });
    console.log(`Connecting`);
    if (socket && room) socket.emit("videojoin", room);
  };
  export const disconnectSocket = () => {
    console.log("Disconnecting");
    if (socket) socket.disconnect();
  };

const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
    ],
  }

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

socket.on('videochatjoin', async () => {
    console.log('Socket event callback: start_call')
  
 
      rtcPeerConnection = new RTCPeerConnection(iceServers)
    //   addLocalTracks(rtcPeerConnection)
    //   rtcPeerConnection.ontrack = setRemoteStream
    //   rtcPeerConnection.onicecandidate = sendIceCandidate
      await createOffer(rtcPeerConnection)
    
  })

  socket.on('webrtc_answer', (event) => {
    console.log('Socket event callback: webrtc_answer')
  
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
  })
  
  socket.on('webrtc_ice_candidate', (event) => {
    console.log('Socket event callback: webrtc_ice_candidate')
  
    // ICE candidate configuration.
    var candidate = new RTCIceCandidate({
      sdpMLineIndex: event.label,
      candidate: event.candidate,
    })
    rtcPeerConnection.addIceCandidate(candidate)
  })
  
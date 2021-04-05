import React from "react";
import "./Video-chat.scss";
function VideoChatContent({ startCall, ref1, ref2 }) {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="video-chat-container">
      <video className="video-chat-localstream" ref={ref1} autoPlay></video>
      <video className="video-chat-remotestream" ref={ref2} autoPlay></video>
      <br />

      <button onClick={startCall}>start</button>
      <button onClick={refreshPage}></button>
    </div>
  );
}

export default VideoChatContent;

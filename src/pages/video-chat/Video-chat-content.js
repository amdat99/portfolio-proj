import React from "react";
import { setMissedCall} from "./Video-chat-requests"

import "./Video-chat.scss";
function VideoChatContent({ videoData, sendProfile, ref1, ref2 }) {
  const refreshPage = async () => {
    await setMissedCall(videoData.videoId,)
    await sendProfile(videoData.receiverId)

    window.location.reload();
  };

  return (
    <div className="video-chat-container">
      <video className="video-chat-localstream" ref={ref1} autoPlay controls ></video>
      <video className="video-chat-remotestream" ref={ref2} autoPlay controls ></video>
      <br />

      {/* <button onClick={startCall}>start</button> */}
      <button style ={{position: 'relative' ,right: '46px'}} onClick={refreshPage}>end call </button>
    </div>
  );
}

export default VideoChatContent;

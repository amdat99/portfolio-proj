import React from "react";
import { setMissedCall} from "./Video-chat-requests"
import {selectVideoData} from "../../redux/messages/messages.selectors"
import { connect} from "react-redux";
import { createStructuredSelector} from "reselect";

import Draggable from 'react-draggable'

import "./Video-chat.scss";
function VideoChatContent({ videoData, sendProfile, ref1, ref2 }) {
  const refreshPage = async () => {
    await setMissedCall(videoData.videoId,)
    await sendProfile(videoData.receiverId)

    window.location.reload();
  };

  return (
    <div>
      <Draggable>
    <div className="video-chat-container">
      <video className="video-chat-localstream" ref={ref1} autoPlay controls ></video>
    
      <br />

      {/* <button onClick={startCall}>start</button> */}
      <button style ={{position: 'relative' ,right: '46px'}} onClick={refreshPage}>end call </button>
    </div>
    </Draggable>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  videoData: selectVideoData

});
export default connect(mapStateToProps)(VideoChatContent);

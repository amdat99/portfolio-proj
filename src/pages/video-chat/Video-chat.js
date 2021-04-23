import React from "react";
// import VideoChatContent from "./Video-chat-content";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Draggable from "react-draggable";
import {
  // sendVideoData,
  // getCallerInfo,
  // fetchcallinfo,
  setMissedCall,
} from "./Video-chat-requests";
import {
  initiateSocket,
  // enterCall,
  sendProfile,
  enterSDP,
  sendSDP,
  enterCand,
  sendCand,
  // sendId,
  checkJoined,
} from "../../sockets/sockets";

// import { initiateVidSocket } from "../../sockets/video-sockets";

import {
  selectCurrentUser,
  selectProfileName,
} from "../../redux/user/user.selectors";
import { setVideoData } from "../../redux/messages/messages.actions";
import { selectVideoData } from "../../redux/messages/messages.selectors";
import { selectReceiverInfo } from "../../redux/profile/profile.selectors";
import { openVideoBox } from "../../redux/modal/modal.actions";

class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.componentCleanup = this.componentCleanup.bind(this);
    this.localVideoref = React.createRef();
    this.remoteVideoref = React.createRef();
    this.socket = null;
    this.candidates = [];
    this.sender = false;
    this.room = this.props.room;

    this.onCall = "";
    this.remoteCandidate = [];
  }

  componentCleanup() {
    // this will hold the cleanup code
    sendProfile(this.props.receiverInfo.recieverId);
    setMissedCall(this.props.videoData.videoId);
  }

  componentDidMount = () => {
    const {
      currentUser,

      getCallerInfo,

      room,
    } = this.props;

    window.addEventListener("beforeunload", this.componentCleanup);

    if (this.props.currentUser) {
      getCallerInfo(currentUser.profileId);
    }

    const config = {
      iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };

    this.pc = new RTCPeerConnection(config);

    if (room) initiateSocket(room);

    enterCand((data) => {
      console.log("From Peer... ", data);
      if (data.candidate !== null) {
        this.candidates = [...this.candidates, data.candidate];
        // this.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        this.addCandidate();
      }
    });
    checkJoined((err, data) => {
      if (err) return;

      // es-lint-disable-next-line
      if (data == this.props.videoData.videoId) {
        sendCand(this.remoteCandidates);
        this.createOffer();
      }
    });

    enterSDP((err, data) => {
      if (err) return;
      if (data !== null) {
        this.pc.setRemoteDescription(new RTCSessionDescription(data));
      }

      // if(this.sender){
      //     sendCand(this.state.remoteCandidate,this.state.videoData.videoId)
      // }

      if (this.sender === false && this.candidates) {
        // sendCand(this.state.remoteCandidate)
        this.props.openVideoBox();
        setTimeout(() => this.createAnswer(), 1000);
      }
    });

    this.pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendCand(e.candidate);
        this.remoteCandidates = [e.candidate];
      }
    };

    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    this.pc.onaddstream = (e) => {
      console.log(this.remoteVideoref);
      this.remoteVideoref.current.srcObject = e.stream;
    };

    const constraints = {
      audio: false,
      video: true,
      // video: {
      //   width: 1280,
      //   height: 720
      // },
      // video: {
      //   width: { min: 1280 },
      // }
    };
    const streamSuccess = (stream) => {
      window.localStream = stream;
      this.localVideoref.current.srcObject = stream;
      this.pc.addStream(stream);
      console.log(stream);
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(streamSuccess)
      .catch((e) => {
        console.log("can not get video stream", e);
      });
  };

  componentWillUnmount() {
    if (this.props.currentUser) {
      this.componentCleanup();
      window.removeEventListener("beforeunload", this.componentCleanup); // remove the event handler for normal unmounting
      sendProfile(this.props.receiverInfo.recieverId);
      setMissedCall(this.props.videoData.videoId);
    }
  }

  componentDidUpdate(prevProps) {
    const { currentUser, receiverInfo, profileName } = this.props;
    if (currentUser) {
      if (this.props.receiverInfo !== prevProps.receiverInfo) {
        this.props.setVideoData({
          videoId: (Math.random() * Math.random()) / Math.random(),
          senderId: currentUser.profileId,
          sender: profileName.toString(),
          receiverId: receiverInfo.recieverId,
          receiver: receiverInfo.recieverName,
          receiverJoined: "no",
        });
      }
    }
  }

  createOffer = async () => {
    await this.setState({ sender: true });

    console.log(this.props.currentUser);
    console.log("Offer");

    this.pc.createOffer({ offerToReceiveVideo: 1 }).then((sdp) => {
      this.pc.setLocalDescription(sdp);

      sendSDP(sdp, this.props.videoData.videoId);
    });
  };

  // startCall = async () => {
  //   await this.setvideoData();

  //   await sendVideoData(this.props.videoData);
  //   await this.setState({ room: this.props.videoData.videoId });
  //   sendProfile(this.props.videoData.receiverId);
  // };

  // answerCall = async (videoId) => {
  //   await this.setState({ room: videoId });
  //   console.log("rrom", this.state.room);

  //   sendId(videoId);
  // };

  createAnswer = () => {
    console.log("Answer");
    this.pc.createAnswer({ offerToReceiveVideo: 1 }).then((sdp) => {
      this.pc.setLocalDescription(sdp);

      sendSDP(sdp);
      this.props.openVideoBox();
    });
  };

  setRemoteDescription = () => {
    const desc = JSON.parse(this.textref.value);
    this.pc.setRemoteDescription(new RTCSessionDescription(desc));
  };

  addCandidate = () => {
    this.candidates.forEach((candidate) => {
      console.log(JSON.stringify(candidate));
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  refreshPage = async () => {
    if (this.props.videoData) {
      await setMissedCall(this.props.videoData.videoId);
      await sendProfile(this.props.videoData.receiverId);
    }
    window.location.reload();
  };

  render() {
    // if(this.state.remoteCandidate){
    // console.log('r',this.state.remoteCandidate)
    // }
    return (
      <div>
        <div></div>

        <div>
          <Draggable>
            <div className="video-chat-container">
              <video
                className="video-chat-localstream"
                ref={this.localVideoref}
                autoPlay
                controls
              ></video>
              <video
                className="video-chat-remotestream"
                ref={this.remoteVideoref}
                autoPlay
                controls
              >
                {" "}
              </video>

              <br />

              {/* <button onClick={startCall}>start</button> */}
              <button
                style={{ position: "relative", right: "46px" }}
                onClick={this.refreshPage}
              >
                end call{" "}
              </button>
            </div>
          </Draggable>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  receiverInfo: selectReceiverInfo,
  profileName: selectProfileName,
  videoData: selectVideoData,
});

const mapDispatchToProps = (dispatch) => ({
  setVideoData: (videoData) => dispatch(setVideoData(videoData)),
  openVideoBox: () => dispatch(openVideoBox()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);

export const closeVideoBox = () => {
  this.props.toggleVideoBox();
};

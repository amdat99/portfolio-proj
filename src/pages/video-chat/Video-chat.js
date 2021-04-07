import React, { useRef, useState, useEffect } from "react";
import VideoChatContent from "./Video-chat-content";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  sendVideoData,
  getCallerInfo,
  fetchcallinfo,
  setMissedCall
} from "./Video-chat-requests";
import {
  initiateSocket,
  enterCall,
  sendProfile,
  enterSDP,
  sendSDP,
  enterCand,
  sendCand,
  sendId,
  checkJoined,
} from "../../sockets/sockets";

import { initiateVidSocket } from "../../sockets/video-sockets";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectReceiverInfo } from "../../redux/profile/profile.selectors";



class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.componentCleanup = this.componentCleanup.bind(this);
    this.localVideoref = React.createRef();
    this.remoteVideoref = React.createRef();
    this.socket = null;
    this.candidates = [];
    this.room = 555;
    this.sender = false;
    this.videoData = {
      videoId: "",
      senderId: "",
      receiverId: "",
      sender: "",
      receiver: "",
      receiverJoined: "",
    };

    this.onCall = "";
    this.remoteCandidate = [];
  }

  componentCleanup() { // this will hold the cleanup code
  
    sendProfile(this.props.videoData.receiverId)  
    setMissedCall(this.props.videoData.videoId)
}
  componentDidMount = () => {
    const {
      currentUser,
      receiverInfo,
      receivedData,
      getCallerInfo,
    } = this.props;

    if(this.props.currentUser){
    window.addEventListener('beforeunload', this.componentCleanup);
    getCallerInfo(currentUser.profileId);
    }
    if (this.room) initiateSocket(this.room);


    checkJoined((err, data) => {
      if (err) return;
      console.log("data", data);
      console.log(this.props.videoData.videoId);
      if (data == this.props.videoData.videoId) {
        this.makeOffer();
      }
    });

    enterSDP((err, data) => {
      if (err) return;
      this.pc.setRemoteDescription(new RTCSessionDescription(data));

      // if(this.sender){
      //     sendCand(this.state.remoteCandidate,this.state.videoData.videoId)
      // }

      if (this.sender === false) {
        this.createAnswer();
      }
    });

    enterCand((err, data) => {
      if (err) return;
      console.log("From Peer... ", JSON.stringify(data));
      this.candidates = [...this.candidates, data];
      this.pc.addIceCandidate(new RTCIceCandidate(data));
    });

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

    this.pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendCand(e.candidate);
        this.setState({ remoteCandidate: e.candidate });
      }
    };

    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    this.pc.onaddstream = (e) => {
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
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(streamSuccess)
      .catch((e) => {
        console.log("can not get video stream", e);
      });
  };

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    sendProfile(this.props.videoData.receiverId)
    setMissedCall(this.props.videoData.videoId)
    
  }

 
  makeOffer = async () => {
    await this.createOffer();
  };

  /* ACTION METHODS FROM THE BUTTONS ON SCREEN */

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

  render() {
    return (
      <div>
        <div>
   
        </div>

        <VideoChatContent
          ref1={this.localVideoref}
          ref2={this.remoteVideoref}
          startCall={this.startCall}
          videoData = {this.props.videoData}
          sendProfile = {sendProfile}
        />

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  receiverInfo: selectReceiverInfo,
});
export default connect(mapStateToProps)(VideoChat);


export const closeVideoBox = () => {
  this.props.toggleVideoBox()
}
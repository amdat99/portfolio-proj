import React, { useRef, useState, useEffect } from "react";
import VideoChatContent from "./Video-chat-content";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Draggable from 'react-draggable'; 
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

import { selectCurrentUser, selectProfileName } from "../../redux/user/user.selectors";
import {setVideoData} from "../../redux/messages/messages.actions"
import {selectVideoData} from "../../redux/messages/messages.selectors"
import { selectReceiverInfo } from "../../redux/profile/profile.selectors";



class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.componentCleanup = this.componentCleanup.bind(this);
    this.localVideoref = React.createRef();
    this.remoteVideoref = React.createRef();
    this.socket = null;
    this.candidates = [];
    this.sender = false;
    this.room = this.props.room


    this.onCall = "";
    this.remoteCandidate = [];
  }

  

  componentCleanup() { // this will hold the cleanup code
    sendProfile(this.props.receiverInfo.recieverId)
    setMissedCall(this.props.videoData.videoId)
      
    
}


  componentDidMount = () => {
    const {
      currentUser,
      receiverInfo,
      receivedData,
      getCallerInfo,
      profileName,
      room
    } = this.props;

    window.addEventListener('beforeunload', this.componentCleanup);
    
if(this.props.currentUser){
    
    getCallerInfo(currentUser.profileId);
    }
    
    if (room) initiateSocket(room);


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
    if(this.props.currentUser){
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    sendProfile(this.props.receiverInfo.recieverId)
    setMissedCall(this.props.videoData.videoId)
    }
    
  }

  componentDidUpdate(prevProps){
    const {
      currentUser,
      receiverInfo,
      receivedData,
      getCallerInfo,
      profileName
    } = this.props;
    if(currentUser){
    if (this.props.receiverInfo !== prevProps.receiverInfo) {
          this.props.setVideoData({
            videoId: (Math.random() * Math.random()) / Math.random(),
            senderId: currentUser.profileId,
            sender: profileName.toString(),
            receiverId: receiverInfo.recieverId,
            receiver: receiverInfo.recieverName,
            receiverJoined: "no",
          
          })
  
        }
        

      }
    }
 
  makeOffer = async () => {
    await this.createOffer();
  };



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
        
          sendProfile = {sendProfile}
        />

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  receiverInfo: selectReceiverInfo,
  profileName: selectProfileName,
  videoData: selectVideoData
});

const mapDispatchToProps = (dispatch) => ({
  setVideoData: (videoData) => dispatch(setVideoData(videoData))
});
export default connect(mapStateToProps,mapDispatchToProps)(VideoChat);


export const closeVideoBox = () => {
  this.props.toggleVideoBox()
}
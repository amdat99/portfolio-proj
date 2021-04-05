import React, { useRef, useState, useEffect } from "react";
import VideoChatContent from "./Video-chat-content";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  sendVideoData,
  getCallerInfo,
  fetchcallinfo,
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

// useEffect(() => {
//     initiateStream()
//     lc.current = new RTCPeerConnection(connectionConfig)

//     lc.current.onicecandidate = (e) =>{
//         if(e.candidate){
//             sendCandidate(e.candidate)
//             console.log(JSON.stringify(e.candidate))
//         }
//     }

//     lc.current.oniceconnectionstatechange = (e) =>{
//         console.log(e)
//     }

//     lc.current.onaddstream = (e) =>{
//         remoteVideoRef.current.srcObject = e.stream
//     }

// },[lc])
// // useEffect(() => {
// //     setRoom(555)
// // },[])

// // useEffect(() => {
// //   if(currentUser)
// //     getCallerInfo(currentUser.profileId)
// // },[])

// // useEffect(() => {
// //     if (room) initiateVidSocket(room);

// // })

// useEffect(() => {
//   if (currentUser && recieverInfo) {
//     setVideoData({
//       videoId: (Math.random() * Math.random()) / Math.random(),
//       senderId: currentUser.profileId,
//       sender: currentUser.displayName,
//       receiverId: 1.1103407964620353,
//       receiver: "john",
//       receiverJoined: "no",
//     });
//   }

// }, [currentUser, recieverInfo,]);

// // useEffect(() => {

// //     if(onCall === 123){
// //         getCallerInfo(currentUser.profileId)

// //            setOnCall('')

// //     }
// // },[onCall,room, recievedData])

// // useEffect(() => {
// //     if(room === videoData.videoId){
// //       sendSDP(SDP)
// //     }
// // },[room])

// // useEffect(() => {
// //     if(remoteSDP){
// //         setRemoteDescription(remoteSDP)
// //     }
// // },[remoteSDP])

// // useEffect(() => {
// //     if(remoteCandidate){
// //         addIceCandidate(remoteCandidate)
// //     }
// // },[remoteCandidate])

//         <br />
//         <button onClick={setRemoteDescription}>Set Remote Desc</button>
//         <button onClick={addCandidate}>Add Candidate</button>
//             {/* <button onClick={startCall }>Begin Call</button> */}
//             {/* <VideoChatContent setVideoData ={setVideoData} addIceCandidate={addIceCandidate} createAnswer ={createAnswer}
//             setRemoteDescription={setRemoteDescription} createOffer ={createOffer} videoData ={videoData} /> */}

//         </div>
//     );
// }

// const mapStateToProps = createStructuredSelector({
//     currentUser: selectCurrentUser,
//     recieverInfo: selectReceiverInfo,
// })

// export default connect(mapStateToProps)(VideoChat);

class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    // https://reactjs.org/docs/refs-and-the-dom.html
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

  componentDidMount = () => {
    const {
      currentUser,
      receiverInfo,
      receivedData,
      getCallerInfo,
    } = this.props;
    this.setvideoData();

    getCallerInfo(currentUser.profileId);

    if (this.room) initiateSocket(this.room);

    // if(this.onCall === 123){
    //     this.getCallerInfo(currentUser.profileId)

    //       this.setState({onCall:''})

    // }

    checkJoined((err, data) => {
      if (err) return;
      console.log("data", data);
      console.log(this.state.videoData.videoId);
      if (data == this.state.videoData.videoId) {
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

  setvideoData = () => {
    const { currentUser, receiverInfo } = this.props;
    this.setState({
      videoData: {
        videoId: (Math.random() * Math.random()) / Math.random(),
        senderId: currentUser.profileId,
        sender: currentUser.displayName,
        receiverId: 1.1103407964620353,
        receiver: "john",
        receiverJoined: "no",
      },
    });
  };

  makeOffer = async () => {
    await this.createOffer();
    this.createOffer();
  };

  /* ACTION METHODS FROM THE BUTTONS ON SCREEN */

  createOffer = async () => {
    await this.setState({ sender: true });

    console.log(this.props.currentUser);
    console.log("Offer");

    this.pc.createOffer({ offerToReceiveVideo: 1 }).then((sdp) => {
      this.pc.setLocalDescription(sdp);

      sendSDP(sdp, this.state.videoData.videoId);
    });
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createAnswer
  // creates an SDP answer to an offer received from remote peer

  startCall = async () => {
    await this.setvideoData();

    await sendVideoData(this.state.videoData);
    await this.setState({ room: this.state.videoData.videoId });
    sendProfile(this.state.videoData.receiverId);
  };

  answerCall = async (videoId) => {
    await this.setState({ room: videoId });
    console.log("rrom", this.state.room);

    sendId(videoId);
  };

  createAnswer = () => {
    console.log("Answer");
    this.pc.createAnswer({ offerToReceiveVideo: 1 }).then((sdp) => {
      this.pc.setLocalDescription(sdp);

      sendSDP(sdp, this.state.room);
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
          {this.props.receivedData
            ? this.props.receivedData.map((data) => (
                <div key={data.videoid}>
                  <span>{data.sender} is calling </span>
                  <button onClick={() => this.answerCall(data.videoid)}>
                    answer
                  </button>
                </div>
              ))
            : null}
        </div>

        <VideoChatContent
          ref1={this.localVideoref}
          ref2={this.remoteVideoref}
          startCall={this.startCall}
        />

        {/* <br />
            <button onClick={this.setRemoteDescription}>Set Remote Desc</button>
            <button onClick={this.addCandidate}>Add Candidate</button> */}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  receiverInfo: selectReceiverInfo,
});
export default connect(mapStateToProps)(VideoChat);

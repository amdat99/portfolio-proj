import React, { useEffect, useState, Suspense, userRef} from "react";


import {
  enterCall,
  sendId,
  sendProfile,
  sendMsgRequest,
  enterOnMessage,
  enterProfileChange

} from "../../sockets/sockets";
import { selectCurrentUser, selectProfileName } from "../../redux/user/user.selectors";
import {fetchNamePending} from "../../redux/user/user.actions"
import {
  selectMessagesData,
  selectMessagesPending,
  selectVideoData
} from "../../redux/messages/messages.selectors";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import useWindowUnloadEffect from "./use-unload";
import {
  changeStatus,
  fetchProfileInfoPending,
  
} from "../../redux/profile/profile.actions";

import { selectProfileInfo, selectReceiverInfo } from "../../redux/profile/profile.selectors";
import {
  sendMessagePending,
  fetchMessagePending,
  incrementLikesPending,
} from "../../redux/messages/messages.actions";
import {
  toggleChatModal,
  toggleVideoBox,
  openVideoBox,
  toggleSucBox
} from "../../redux/modal/modal.actions";
import { selectVideoBox, selectSucBox } from "../../redux/modal/modal.selectors";
import { Link } from "react-router-dom";

import VideoChat from "../video-chat/Video-chat";
import VideoChatLog from "../../components/video-chat-log/Video-chat-log"
import { setMissedCall, sendVideoData } from "../video-chat/Video-chat-requests"

import "./Chat-page.scss";



const MessageBox = React.lazy(() =>
  import("../../components/message-box/Message-box")
);
const UsersSidebar = React.lazy(() =>
  import("../../components/users-sidebar/Users-sidebar")
);
const WeatherBox = React.lazy(() =>
  import("../../components/weather-box/Weather-box")
);


function ChatPage({
  
 
  currentUser,
  sendMessagePending,
  fetchMessagePending,
  messages,
  changeStatus,
  pending,
  incrementLikesPending,
  getProfileInfo,
  profileInfo,
  videoBox,
  toggleVideoBox,
  openVideoBox,
  receiverInfo,
  successMessage,
  fetchNamePending,
  profileName,
  videoInfo
}) {

  // useWindowUnloadEffect(() => {
  
  //   setMissedCall(videoData.videoId,)
  //   sendProfile(videoData.receiverId)
  // });


  const [searchField, setSearchField] = useState("");
  const [messageData, setMessageData] = useState({
    userName: "",
    message: "",
    messageId: "",
    userId: "",
    image: "",
  });
  const [imageToggle, setImageToggle] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [render, setRender] = useState("");
  const [onName, setOnName] = useState("");
  const [receivedData, setReceivedData] = useState(null);

  const [room, setRoom] = useState(555);
  const [toggleCallLog, setToggleCallLog] = useState(false);
  const [timer, setTimer] = useState(0)
  const [onConnect, setOnConnect] = useState(false);
const [videoData, setVideoData] = useState(null);

useEffect(()=>{
  if(videoInfo && receiverInfo){
  setVideoData(videoInfo)
  }
},[videoInfo])

  useEffect(() => {
    if(currentUser){
    getCallerInfo(currentUser.profileId);
    fetchNamePending(currentUser.profileId)
    }
  }, [currentUser,fetchNamePending]);

 


  useEffect(() => {
    enterCall((err, data) => {
      if (err) return;
      if(currentUser){
      if (data === currentUser.profileId) {
        getCallerInfo(currentUser.profileId);
        console.log("getting incoming call data");
      }
    }
    
  });
      enterOnMessage((err, data) => {
        if (err) return;
  
        if (data === 'message') {
         fetchMessagePending();
          console.log("fetching messages");
        }
    });

    enterProfileChange((err, data) => {
      if (err) return;

      if (data === 'profile') {
       getProfileInfo();
        console.log("fetching profiles");
      }
  });
  })

  useEffect(() => {
    getProfileInfo();
  },[])


  useEffect(() => {
    setRender("render")
    fetchMessagePending();
  }, [fetchMessagePending, render]);

  useEffect(() => {
    if (currentUser !== null) {
      setMessageData({
        userName: profileName.toString(),
        userId: currentUser.profileId,
        messageId: Math.random(),
      });
    } else {
      setMessageData({
        userName: "",
        userId: Math.random(),
        messageId: Math.random(),
      });
    }
  }, [currentUser, changeStatus, getProfileInfo,profileName]);

  useEffect(() => {
    if (currentUser) {
      changeStatus(currentUser.profileId, "online");
     
    }
  }, [currentUser, changeStatus]);

  // useEffect(() => {
  //   const interval = setInterval(() => fetchMessagePending(), 4000);
  //   return () => clearInterval(interval);
  // }, [fetchMessagePending]);

  console.log(profileName)

  const handleChange = (event) => {
    setMessageData({ ...messageData, message: event.target.value });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    toggleShowImage();
    sendMessagePending(messageData);
    fetchMessagePending();
    sendMsgRequest();
    if (currentUser) {
      setMessageData({
        userName: profileName.toString(),
        userId: currentUser.id,
        messageId: Math.random(),
        message: "",
        image: "",
      });
    } else {
      setMessageData({
        userName: nameInput,
        userId: Math.random(),
        messageId: Math.random(),
        message: "",
        image: "",
      });
    }
    setImageToggle(false);
  };

  const addImageUrl = (event) => {
    setMessageData({ ...messageData, image: event.target.value });
  };

  const onHandleSearch = (event) => {
    setSearchField(event.target.value);
  };

  const filteredMessages = () => {
    return messages.filter((message) => {
      return message.name.toLowerCase().includes(searchField.toLowerCase());
    });
  };

  const verifyImage = () => {
    setMessageData({ image: "" });
    setImageToggle(false);
  };

  const toggleShowImage = () => {
    setImageToggle(!imageToggle);

    const xhr = new XMLHttpRequest(); //verify url image size
    xhr.open("GET", messageData.image, true);
    xhr.responseType = "image/png";
    xhr.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        const size = this.response.byteLength;
        if (size > 2242880) {
          alert("use an image under 2mb");
        }
      }
    };
    xhr.send(null);
  };

  const onNameInput = async () => {
    await setNameInput(onName);
    setMessageData({ ...messageData, userName: onName });
  };

  const getCallerInfo = async (userId) => {
    await fetch("https://aamirproject-api.herokuapp.com/fetchcallinfo", {

    // await fetch("http://localhost:4000/fetchcallinfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId.toString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReceivedData(data);
      });
  };

  const changeCallerStatus = () => {
    setMissedCall()
    .then((data) =>
    setReceivedData(data))
  }

  const onToggleCallLog = () => {
    setToggleCallLog(!toggleCallLog)

  }

const  answerCall = async (videoId) => {
  await setRoom(videoId)
    console.log("rrom", room);
    
    sendId(videoId);
    openVideoBox()

  };


  const beginCall = async () => {
  
    if(receiverInfo && videoInfo ){

      try{
     
      sendVideoData(videoInfo).then((data) =>{
        
        if(data === 'error') {
         return alert('call error try again')
        }

    openVideoBox();
        
      setRoom(videoInfo.videoId)
       sendProfile(receiverInfo.recieverId);
      })
      }catch(err){
      console.log("error",err)
    }
  }
  }



let today = new Date()
 
  return (
    <div>
      <Suspense fallback={<div className="loader"></div>}>
        {/* <ChatRoom /> */}
        <div className={videoBox ? "chat-page-vidshow" : "chat-page-vidhide"}>
         
          <div>
            {successMessage?
            <span>connection success</span>
            : null}
          <VideoChat
            currentUser={currentUser}
            profileInfo={profileInfo}
            receivedData={receivedData}
            videoBox={videoBox}
            getCallerInfo={getCallerInfo}
              room={room}
            changeCallerStatus = {changeCallerStatus}
            toggleVideoBox={toggleVideoBox}
          />
          </div>
         
    
       
        </div>
        <div>
        <Link
          to="/chatroom"
          className="chat-page-roomlink"
         
        >
          Chat Rooms{"  "}
        </Link>

        {/* <Link
          onClick={toggleVideoBox}
          className="chat-page-roomlink"
          
        >
          VideoChat{"  "}
        </Link> */}
       {currentUser ? 
       <Link
         className="chat-page-roomlink"
          onClick={onToggleCallLog}
          
        >
          Chat log{"  "}
        </Link>
        : <Link  className="chat-page-roomlink" onClick={() =>alert('sign in to see logs')}>Chat Log</Link>}
        </div>
        <input
          aria-label="Search name"
          className="chat-page-searchbox"
          type="search"
          placeholder="search name"
          onChange={onHandleSearch}
        />
        <div className= {toggleCallLog?'chat-page-video-logs':null}>
      {
      receivedData?
      receivedData.map(data =>
      <div key = {data.videoid}>{toggleCallLog?
          
          <VideoChatLog  data = {data} openVideoBox  ={openVideoBox} beginCall = {beginCall}/>
            :null}
          {data.senderstatus === 'calling'
          
          ?<div className="vid-container">
            <span>{data.sender} is connected </span>
          <button id ='vid-join-button'onClick={()=>answerCall(data.videoid)}>Join Call</button>
          {/* <span onMouseEnter ={}>x</span> */}
          <div className="vid-animation">{data.date.slice(0, 10)}</div>
          </div> 
          : null}
         </div>
      )
      :null}
      </div>
    
        <form className="chat-page-scroller hide-scroll" onSubmit={sendMessage}>
          {pending ? <div className="loader"></div> : null}
          {messages
            ? filteredMessages().map((message) => (
                <MessageBox
                  messageData={message}
                  key={message.messageid}
                  fetchMessage={fetchMessagePending}
                  incrementLikesPending={incrementLikesPending}
                  sendMsgRequest = {sendMsgRequest}
                  currentUser={currentUser}
                />
              ))
            : null}
          <textarea
            id="chat-page-send"
            value={messageData.message}
            aria-label="add message"
            type="text-area"
            placeholder="Enter Message"
            onChange={handleChange}
            required
          />

          <input
            type="url"
            placeholder="addImageUrl"
            onChange={addImageUrl}
            id="chat-page-image"
            value={messageData.image}
            aria-label="Add Image URl"
          />
          {currentUser ? (
            <button id="chat-page-button" type="submit">
              send
            </button>
          ) : (
            <div>
              {nameInput ? (
                <div>
                  <button
                    id="chat-page-changename"
                    onClick={() => setNameInput("")}
                  >
                    Change Name
                  </button>
                  <button
                    id="chat-page-button"
                    type="submit"
                    style={{ left: "100px" }}
                  >
                    send
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    onChange={(e) => setOnName(e.target.value)}
                    placeholder="enter username"
                    id="chat-page-userinput"
                  />
                  <button type="button" id="chat-page-inputbutton" onClick={onNameInput}>
                    Enter Name
                  </button>
                </div>
              )}
            </div>
            // <Link to="/signon" id="chat-page-signin">
            //   {" "}
            //   sign in to message and see users
            // </Link>
          )}
        </form>

        <UsersSidebar searchField={searchField} render={render} beginCall = {beginCall} />

        <WeatherBox />
        {imageToggle ? (
          <img
            src={messageData.image}
            onError={verifyImage}
            alt="verify"
            width="5"
            height="5"
          />
        ) : null}
      </Suspense>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  messages: selectMessagesData,
  pending: selectMessagesPending,
  profileInfo: selectProfileInfo,
  videoBox: selectVideoBox,
  receiverInfo: selectReceiverInfo,
  successMessage: selectSucBox,
  profileName: selectProfileName,
  videoInfo: selectVideoData
});

const mapDispatchToProps = (dispatch) => ({
  sendMessagePending: (messageData) =>
    dispatch(sendMessagePending(messageData)),
  fetchMessagePending: () => dispatch(fetchMessagePending()),
  changeStatus: (profileId, status) =>
    dispatch(changeStatus({ profileId, status })),
  incrementLikesPending: (messageData) =>
    dispatch(incrementLikesPending(messageData)),
  getProfileInfo: () => dispatch(fetchProfileInfoPending()),
  toggleChatModal: () => dispatch(toggleChatModal()),
  toggleVideoBox: () => dispatch(toggleVideoBox()),
  openVideoBox : () => dispatch(openVideoBox()),
  toggleSucBox: () => dispatch(toggleSucBox()),
  fetchNamePending: (profileId) => dispatch(fetchNamePending(profileId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);


export const onVidConnet = () => {
  toggleSucBox();
  setTimeout(function(){  toggleSucBox()}, 3000);

}
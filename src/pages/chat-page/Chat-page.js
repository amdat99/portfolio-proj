import React, { useEffect, useState, Suspense,} from "react";


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
import {createGroupPending, getGroupsPending, setCurrentGroup } from "../../redux/groupchat/groupchat.actions"
import {selectGroupChats} from "../../redux/groupchat/groupchat.selectors"
import {
  selectMessagesData,
  selectMessagesPending,
  selectVideoData
} from "../../redux/messages/messages.selectors";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import useWindowUnloadEffect from "./use-unload";
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
import GroupchatDropdown   from "../../components/groupchat-dropdown/Groupchat-dropdown"
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
  videoInfo,
  createGroupPending,
  getGroupsPending,
  groupChats,
  setCurrentGroup
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
    video: ""
  });
  const [imageToggle, setImageToggle] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [render, setRender] = useState("");
  const [onName, setOnName] = useState("");
  const [receivedData, setReceivedData] = useState(null);

  const [room, setRoom] = useState(555);
  const [toggleCallLog, setToggleCallLog] = useState(false);

  // const [timer, setTimer] = useState(0)
  //eslint-disable-next-line
const [videoData,setVideoData] = useState(null);
const [mediaInput, setMediaInput] = useState(false);
const [mediaType, setMediaType] = useState('');
const [showSidebar, setShowSidebar] = useState(false)
const [toggleGroupchat , setToggleGroupchat] = useState(false)

useEffect(()=>{
  if(videoInfo && receiverInfo){
  setVideoData(videoInfo)
  }
  //eslint-disable-next-line
},[videoInfo])

  useEffect(() => {
    if(currentUser){
    getCallerInfo(currentUser.profileId);
    fetchNamePending(currentUser.profileId)
    }
  }, [currentUser,fetchNamePending]);

 useEffect(() => {
   if(currentUser){
   getGroupsPending(currentUser.profileId)
   }
 },[currentUser,getGroupsPending]);


  useEffect(() => {  // sockets 
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
    //eslint-disable-next-line
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
  }, [currentUser, changeStatus,profileName]);

  useEffect(() => {
    if (currentUser) {
      changeStatus(currentUser.profileId, "online");
     
    }
  }, [currentUser, changeStatus]);

  // useEffect(() => {
  //   const interval = setInterval(() => fetchMessagePending(), 4000);
  //   return () => clearInterval(interval);
  // }, [fetchMessagePending]);


  const handleChange = (event) => {
    setMessageData({ ...messageData, message: event.target.value });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    await toggleShowImage();
    await sendMessagePending(messageData);
   
    sendMsgRequest();
    if (currentUser) {
      setMessageData({
        userName: profileName.toString(),
        userId: currentUser.id,
        messageId: Math.random(),
        message: "",
        image: "",
        video:''
      });
    } else {
      setMessageData({
        userName: nameInput,
        userId: Math.random(),
        messageId: Math.random(),
        message: "",
        image: "",
        video: ""
      }); 
    }
    setTimeout(function(){ fetchMessagePending();}, 1500);

 
    setImageToggle(false);
  };

  const addImageUrl = (event) => {
    setMessageData({ ...messageData, image: event.target.value });
  };

  const addVideoUrl = (event) => {
    setMessageData({ ...messageData, video: event.target.value });
  }

  const onMediaInput = (media) => {
    setMediaType(media)
    setMediaInput(true)
}

const closeMediaInput = () => {
  setMediaInput(false)
}

const toggleSideBar = () => {
  setShowSidebar(!showSidebar)
}
const ontoggleGroupchat = () => {
  setToggleGroupchat(!toggleGroupchat)
}
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

  const incrementLikes = (id) =>{
    incrementLikesPending(id)
    
    setTimeout(function(){ fetchMessagePending()}, 1000);

  }



// let today = new Date()
 
  return (
    <div className ='chat-back chat-page-dark'>
      <Suspense fallback={<div className="loader"></div>}>
        {/* <ChatRoom /> */}
 
          {/* //header links :*/}
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
        
         { currentUser?
            <Link className="chat-page-roomlink" onClick={ontoggleGroupchat}> group chats</Link>
        :<Link  className="chat-page-roomlink" onClick ={()=> alert('sign in to view groupchats')}>group chats</Link> }
        
        </div>
        
        {/* // searchcbox */}
        <input
          aria-label="Search name"
          className="chat-page-searchbox"
          type="search"
          placeholder="search name"
          onChange={onHandleSearch}
        />



         {/* //chat log: */}
      <div className= {toggleCallLog?'chat-page-video-logs':null}>
      {
      receivedData?
      receivedData.map(data =>
      <div key = {data.videoid}>{toggleCallLog? 
          
         
      <VideoChatLog  data = {data} openVideoBox  ={openVideoBox} beginCall = {beginCall} />
      :null}
          
          {/* // answer video call component */}
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
  
  {/* //messages components */}
        <form className="chat-page-scroller hide-scroll" onSubmit={sendMessage}>
          {pending ? <div className="loader"></div> : null}
          {messages
            ? filteredMessages().map((message) => (
                <MessageBox
                  messageData={message}
                  key={message.messageid}
                  fetchMessage={fetchMessagePending}
                  incrementLikesPending={incrementLikes}
                  sendMsgRequest = {sendMsgRequest}

                  
                />
              ))
            : null}
                
          <textarea        // component for message data input below
            id="chat-page-send"
            value={messageData.message}
            aria-label="add message"
            type="text-area"
            placeholder="Enter Messages"
            
            onChange={handleChange}
            required
          />

        
        { mediaInput?
        <div>
          <input
            type="url"
            placeholder={"add "+ mediaType + ' url'}
            onChange={mediaType === "image" ? addImageUrl: addVideoUrl}
            id="chat-page-image"
            // value={messageData.image}
            aria-label="Add Media URl"
           
          />
          <button   id="chat-page-imagebutt" onClick={closeMediaInput}>X</button>
          <span style={{marginBottom: '23px' ,marginLeft: '24%',color: '#2CA4AB'}}
          id="chat-page-imagebutt" >{mediaType === "image" ? 'Image': 'Video'}</span>
          </div>
        :null}
         
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
                
                  <input           //set guest uername
                    type="text"
                    onChange={(e) => setOnName(e.target.value)}
                    placeholder="enter guest username"
                    id="chat-page-userinput"
                  />
                  
                </div>
              )}
            </div>
            // <Link to="/signon" id="chat-page-signin">
            //   {" "}
            //   sign in to message and see users
            // </Link>
          )}
        </form>  
        {!nameInput && !currentUser?
        <button type="button" id="chat-page-inputbutton" onClick={onNameInput}>
                    Enter
                  </button>
          : null}

          {/* //groupchat dropdown header */}
         { toggleGroupchat?
       
       <div >
      <GroupchatDropdown currentUser = {currentUser} createGroupPending={createGroupPending} setCurrentGroup = {setCurrentGroup}
      groupChats = {groupChats} getGroupsPending = {getGroupsPending} />
      </div>
     
       : null}
            <div className={videoBox ? "chat-page-vidshow" : "chat-page-vidhide"}>
         
         <div>
           {successMessage?
           <span>connection success</span>
           : null}

           {/* //groupchat page */}
         
{/* 
           //video chatbox component */}
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
        
    
      {/* // image and video buttons for messages */}
       </div>
        <div className= 'chat-page-icons'>  
        <div onClick={()=> {onMediaInput('image'); setMediaInput(true)}}
          style={{cursor: "pointer",marginRight: '100px',zIndex:'-1',position:'relative'}}>📷  Image</div>  

         <div  onClick={()=> {onMediaInput('video'); setMediaInput(true)}}
                   style={{ marginLeft: '100px',position: 'relative',top: '-20px' ,cursor: 'pointer',zIndex:'-1' }} >🎥  Vid</div>
      </div> 
      <div id ={ showSidebar? 'chat-side-bar-show': 'chat-side-bar-hide' } >
     
     
        <UsersSidebar showSidebar ={showSidebar} searchField={searchField} render={render} beginCall = {beginCall} />
       </div> <button id='chat-page-side-butt'onClick={toggleSideBar}>sidebar</button>
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
  videoInfo: selectVideoData,
  groupChats: selectGroupChats
});

const mapDispatchToProps = (dispatch) => ({
  sendMessagePending: (messageData) =>
    dispatch(sendMessagePending(messageData)),
  fetchMessagePending: () => dispatch(fetchMessagePending()),
  changeStatus: (profileId, status) =>
    dispatch(changeStatus({ profileId, status })),
  incrementLikesPending: (messageid) =>
    dispatch(incrementLikesPending(messageid)),
  getProfileInfo: () => dispatch(fetchProfileInfoPending()),
  toggleChatModal: () => dispatch(toggleChatModal()),
  toggleVideoBox: () => dispatch(toggleVideoBox()),
  openVideoBox : () => dispatch(openVideoBox()),
  toggleSucBox: () => dispatch(toggleSucBox()),
  fetchNamePending: (profileId) => dispatch(fetchNamePending(profileId)),
  createGroupPending: (groupData) => dispatch(createGroupPending(groupData)),
  getGroupsPending : (userId) => dispatch(getGroupsPending(userId)),
  setCurrentGroup : (groupData) => dispatch(setCurrentGroup(groupData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);


// export const onVidConnet = () => {
//   toggleSucBox();
//   setTimeout(function(){  toggleSucBox()}, 3000);

// }
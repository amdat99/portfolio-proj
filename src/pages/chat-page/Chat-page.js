import React, { useEffect, useState, Suspense } from "react";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  selectMessagesData,
  selectMessagesPending,
} from "../../redux/messages/messages.selectors";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  changeStatus,
  fetchProfileInfoPending,
} from "../../redux/profile/profile.actions";

import {
  sendMessagePending,
  fetchMessagePending,
  incrementLikesPending,
} from "../../redux/messages/messages.actions";
import { toggleChatModal } from "../../redux/modal/modal.actions";
import { Link } from "react-router-dom";

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
  toggleChatModal,
}) {
  const [searchField, setSearchField] = useState("");
  const [messageData, setMessageData] = useState({
    userName: "",
    message: "",
    messageId: "",
    userId: "",
    image: "",
  });
  const [imageToggle, setImageToggle] = useState(false);
  const [nameInput, setNameInput] = useState('')
  const [render, setRender] = useState("");
  const [onName, setOnName] = useState('')

  useEffect(() => {
    setRender("render");
    getProfileInfo();
    fetchMessagePending();
  }, [fetchMessagePending, getProfileInfo, render]);

  useEffect(() => {
    if (currentUser !== null) {
      setMessageData({
        userName: currentUser.displayName,
        userId: currentUser.profileId,
        messageId: Math.random(),
      });
    } else {
      setMessageData({userName: '', userId: Math.random(), messageId: Math.random()});
    }
  }, [currentUser, changeStatus, getProfileInfo]);

  useEffect(() => {
    if (currentUser) {
      changeStatus(currentUser.profileId, "online");
    }
  }, [currentUser, changeStatus]);

  useEffect(() => {
    const interval = setInterval(() => fetchMessagePending(), 4000);
    return () => clearInterval(interval);
  }, [fetchMessagePending]);

  const handleChange = (event) => {
    setMessageData({ ...messageData, message: event.target.value });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    toggleShowImage();
    sendMessagePending(messageData); 
    if(currentUser){
    setMessageData({
     
      userName: currentUser.displayName,
      userId: currentUser.id,
      messageId: Math.random(),
      message: "",
      image: "",
    });
  } else{
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

  const onNameInput =  async () => {
    await setNameInput(onName)
    setMessageData({...messageData,userName: nameInput})

  }

  console.log(nameInput)
  return (
    <div>
      <Suspense fallback={<div className="loader"></div>}>
        {/* <ChatRoom /> */}
        <Link to="/chatroom" className="chat-page-roomlink" style = {{marginLeft: '55px'}}>
          Chat Rooms{"  "}
        </Link>
        <input
          aria-label="Search name"
          className="chat-page-searchbox"
          type="search"
          placeholder="search name"
          onChange={onHandleSearch}
        />

        <form className="chat-page-scroller hide-scroll" onSubmit={sendMessage}>
          {pending ? <div className="loader"></div> : null}
          {messages
            ? filteredMessages().map((message) => (
                <MessageBox
                  messageData={message}
                  key={message.messageid}
                  fetchMessage={fetchMessagePending}
                  incrementLikesPending={incrementLikesPending}
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
            
        
            { nameInput?
            <div>
             <button id="chat-page-changename" onClick={()=> setNameInput('')}>Change Name</button>
            <button id="chat-page-button" type="submit" style={{ left: '100px' }}>
              send
            </button>
            </div>
            : <div>
            <input type="text" onChange ={(e)=> setOnName(e.target.value)} placeholder="enter username" id='chat-page-userinput' />
            <button id='chat-page-inputbutton' onClick={onNameInput}>Enter Name</button>   
            </div>}
          </div>
            // <Link to="/signon" id="chat-page-signin">
            //   {" "}
            //   sign in to message and see users
            // </Link>
          )}
        </form>
       
          <UsersSidebar searchField={searchField} render={render} />
       
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

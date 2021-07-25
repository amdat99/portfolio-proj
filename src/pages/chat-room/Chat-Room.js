import React, { useState, useEffect } from "react";
import ChatRoomContent from "../../components/chat-room-content/Chat-room-content";
import {
  // initiateSocket,
  // disconnectSocket,
  enterChat,
  sendMessage,
  enterCreateRoom,
  sendRoomRequest,
} from "../../sockets/sockets";

import { Link } from "react-router-dom";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { setCurrentRoom } from "../../redux/messages/messages.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./Chat-room.scss";

function ChatRoom({ currentUser, setCurrentRoom }) {
  const [createRoom, setCreateRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [name, setName] = useState("");
  const [onName, setOnName] = useState("");
  const [messageRoom] = useState(null);
  const [chatHandler, setChatHandler] = useState(null)

  useEffect(() => {
    fetchRooms();

    if (currentUser) {
      setName(currentUser.displayName);
    } //eslint-disable-next-line
  }, [currentUser, room, name, onName]);


   useEffect(()=> {
     if(chatHandler){
    setChat((existingdata) => [
      chatHandler.message + ("(" + chatHandler.room + ")"),
      ...existingdata,
    ]);
  }
   },[chatHandler])
  useEffect (() => {
    // if (room) initiateSocket(room);
    // if (room === undefined) {
    //   setRoom(rooms[0]);

    // }

    enterChat((err, data) => {
      if (err) return;
      setChatHandler(data)
    });

    enterCreateRoom((err, data) => {
      if (err) return;
      if (data) {
        fetchRooms();
      }
    });
  }, [rooms, room]);

  const fetchRooms = () => {
    fetch("https://aamirproject-api.herokuapp.com/fetchrooms", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        // if (room === undefined) {
        //   setRoom(rooms[0]);

        // }
      });
  };

  const addName = () => {
    setName(onName);
  };

  const addRoom = async () => {
    if (createRoom) {
      await sendRoom();
      await fetchRooms();
      await setCreateRoom("");
      sendRoomRequest();
    }
  };
  const sendRoom = async () => {
    fetch("https://aamirproject-api.herokuapp.com/addroom", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: createRoom,
      }),
    });
    fetchRooms();

    setChatHistory(chat);
    setChat([...chat, chatHistory]);
  };

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  const getRoomInput = (event) => {
    setCreateRoom(event.target.value);
  };

  return (
    <div className="chatroom-container">
      <Link to="chatapp" id="chatroom-link">
        ChatApp
      </Link>
      {!name ? (
        <div id="chatroom-input">
          <input
            type="text"
            onChange={(e) => setOnName(e.target.value)}
            placeholder="enter username"
          />
          <button onClick={addName}>add name</button>
        </div>
      ) : (
        <div>
          <span>room: {room}</span>
          <ChatRoomContent
            rooms={rooms}
            chat={chat}
            addRoom={addRoom}
            getRoomInput={getRoomInput}
            handleInput={handleInput}
            message={name + ":   " + message}
            setRoom={setRoom}
            room={room}
            sendMessage={sendMessage}
            setCurrentRoom={setCurrentRoom}
            messageRoom={messageRoom}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

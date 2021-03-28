import React, { useState, useEffect } from "react";
import ChatRoomContent from "../../components/chat-room-content/Chat-room-content";
import {
  initiateSocket,
  disconnectSocket,
  enterChat,
  sendMessage,
} from "../../sockets/sockets";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

let socket;

function ChatRoom({ currentUser }) {
  const [createRoom, setCreateRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [name, setName] = useState("");
  const [onName, setOnName] = useState("");

  useEffect(() => {
    fetchRooms();

   
    if (currentUser) {
      setName(currentUser.displayName);
    }

    
  }, [currentUser, room,name]);

  useEffect(() => {
    if (room) initiateSocket(room);
    

    enterChat((err, data) => {
      if (err) return;
      setChat((existingdata) => [data, ...existingdata]);
    });
    return () => {
      disconnectSocket();
    };
  }, [room]);

  const fetchRooms = () => {
    fetch("https://aamirproject-api.herokuapp.com/fetchrooms", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        if(room === undefined){
          setRoom(rooms[0]);
          }
      });
  };

  const addName = () => {
    setName(onName);
  };

  const addRoom = () => {
    if (createRoom) {
      sendRoom();
      setCreateRoom("");
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
      {!name ? (
        <div>
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
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChatRoom);

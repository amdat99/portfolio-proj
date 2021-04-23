import React from "react";

import "./Chat-room-content.scss";

function ChatRoomContent({
  rooms,
  chat,
  addRoom,
  getRoomInput,
  handleInput,
  message,
  setRoom,
  room,
  sendMessage,
  setCurrentRoom,
  messageRoom,
}) {
  const sendCurrentMessage = () => {
    if (room === undefined) {
      alert("select room");
    }
    sendMessage(room, message);
  };
  return (
    <div className="chat-content-container">
      <h4 id="chat-content-title">Select Room : </h4>
      {rooms
        ? rooms.map((room, i) => (
            <button
              id="chat-content-room"
              onClick={() => {
                setCurrentRoom(room);
                setRoom(room);
              }}
              key={i}
            >
              {room}
            </button>
          ))
        : null}

      <div id="chat-content-createroom">
        <input type="text" onChange={getRoomInput} placeholder="create room" />
        <button onClick={addRoom}>create room</button>
      </div>

      <div className="chat-content-messages">
        {chat
          ? chat.map((messages, i) => (
              <span id="chat-content-message" key={i}>
                {messages}
                {messageRoom}
              </span>
            ))
          : null}
      </div>
      <textarea type="text" onChange={handleInput} id="chat-content-input" />
      <button id="chat-content-send" onClick={sendCurrentMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatRoomContent;

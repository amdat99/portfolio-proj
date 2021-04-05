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
}) {
  return (
    <div className="chat-content-container">
      <h4 id="chat-content-title">Select Room : </h4>
      {rooms
        ? rooms.map((room, i) => (
            <button
              id="chat-content-room"
              onClick={() => {
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
              </span>
            ))
          : null}
      </div>
      <textarea type="text" onChange={handleInput} />
      <button id="chat-content-send" onClick={() => sendMessage(room, message)}>
        Send
      </button>
    </div>
  );
}

export default ChatRoomContent;

import React from "react";

import './Chat-room-content.scss'

function ChatRoomContent({
  rooms,
  chat,
  addRoom,
  getRoomInput,
  handleInput,
  message,
  setRoom,
  room,
  sendMessage
}) {
  return (
    <div className="chat-content-container">
      {'Select Room: '}
      {rooms? 
      rooms.map((room, i) => (
        <button
          onClick={() => {
            setRoom(room);
          }}
          key={i}
        >
          {room}
        </button>
      )):null}

      <input type="text" onChange={getRoomInput} placeholder="create room" />
      <button onClick={addRoom}>create room</button>

      <textarea type="text" onChange={handleInput}  />
      <button onClick={() => sendMessage(room, message)}>Send</button>
      {chat?
      chat.map((messages, i) => (
        <p key={i}>{messages}</p>
      )):null}
    </div>
  );
}

export default ChatRoomContent;

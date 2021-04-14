import React from "react";
import {connect} from "react-redux"
import { setRoom } from "../../redux/messages/messages.actions";

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
  stateRoom
}) {
  return (
    <div className="chat-content-container">
      <h4 id="chat-content-title">Select Room : </h4>
      {rooms
        ? rooms.map((room, i) => (
            <button
              id="chat-content-room"
              onClick={() => {
                setRoom(room);stateRoom(room)
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
                {messages.message}
                { messages.room !== undefined
                ?`(${messages.room})`
                : null}
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

const mapDispatchToProps = (dispatch) => ({
  setRoom: (room) => dispatch(setRoom(room))
});


export default connect(null,mapDispatchToProps)(ChatRoomContent);

import React, { useState, useEffect } from "react";
import {
  getRecievedMessageDoc,
  getSentMessageDoc,
} from "../../firebase/firebase";

import "./Profile-messages.scss";

function ProfileMessages({ currentUser, profileName }) {
  const [recievedMessages, setRecievedMessages] = useState(null);
  const [sentMessages, setSentMessages] = useState(null);

  useEffect(() => {
    getSentMessages();
    getRecievedMessages();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getRecievedMessages(), 5000);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [recievedMessages]);

  useEffect(() => {
    const interval = setInterval(() => getSentMessages(), 5000);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [sentMessages]);

  const getRecievedMessages = async () => {
    const request = await getRecievedMessageDoc(currentUser.profileId);
    setRecievedMessages(request);
  };

  const getSentMessages = async () => {
    const request = await getSentMessageDoc(currentUser.profileId);
    setSentMessages(request);
  };

  return (
    <div className="profile-messages-container">
      {recievedMessages
        ? recievedMessages.map((sentMessage, i) => (
            <ul key={i} id="message-box-container">
              <span style={{ maxWidth: "50px" }}>
                {" "}
                {sentMessage.senderName}:
              </span>
              <span
                style={{ maxWidth: "120px" }}
                id="profile-messages-recieved"
              >
                {" "}
                {sentMessage.message}{" "}
                <div id="profile-messages-recieved-date">
                  {sentMessage.createdAt}
                </div>{" "}
              </span>
            </ul>
          ))
        : null}
      {sentMessages ? (
        <div id="profile-messages-sentcont">
          {sentMessages.map((message, i) => (
            <ul key={i}>
              <span id="profile-messages-sent">
                {" "}
                {message.message}{" "}
                <span id="profile-messages-sent-date">
                  to {message.recieverName} {message.createdAt}{" "}
                </span>
              </span>

              <span></span>
            </ul>
          ))}
        </div>
      ) : null}
      )
    </div>
  );
}

export default React.memo(ProfileMessages);

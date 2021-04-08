import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchProfileInfoPending } from "../../redux/profile/profile.actions";
import { sendDirectMessagePending } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  selectProfileInfo,
  selectReceiverInfo,
} from "../../redux/profile/profile.selectors";
import { openModal } from "../../redux/modal/modal.actions";

import { setMessageDoc } from "../../firebase/firebase";
import "./Direct-messaging-box.scss";

function DirectMessagingBox({
  currentUser,
  profilesInfo,
  getProfileInfo,
  profileId,
  displayName,
  sendDirectMessagePending,
  profileName,
  openModal,
  recieverInfo,
}) {
  const [messageData, setMessageData] = useState({
    message: "",
    senderName: "",
    senderId: "",
    recieverName: "",
    recieverId: "",
  });

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);

  useEffect(() => {
    if (currentUser && recieverInfo) {
      setMessageData({
        senderName: profileName.toString(),
        senderId: currentUser.profileId,
        recieverId: recieverInfo.recieverId,
        recieverName: recieverInfo.recieverName,
      });
    }
  }, [currentUser, recieverInfo]);

  const onMessage = (event) => {
    setMessageData({ ...messageData, message: event.target.value });
  };

  const onSend = async (event) => {
    event.preventDefault();
    if (currentUser.profileId !== recieverInfo.recieverId) {
      setMessageDoc(messageData);
      setMessageData({
        senderName: profileName.toString(),
        senderId: currentUser.profileId,
        recieverId: profileId,
        message: "",
        recieverName: displayName,
      });
    } else alert("dont send yourself a message please");
  };

  return (
    <div className="direct-messaging-container">
      <form onSubmit={onSend}>
        <textarea
          id="direct-messaging-input"
          onFocus={openModal}
          onChange={onMessage}
          placeholder={"type message to " + recieverInfo.recieverName}
          required
        ></textarea>
        <button id="direct-messaging-button" type="submit">
          send
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getProfileInfo: (messageData) =>
    dispatch(fetchProfileInfoPending(messageData)),
  sendDirectMessagePending: (messageData) =>
    dispatch(sendDirectMessagePending(messageData)),
  openModal: () => dispatch(openModal()),
});

const mapStateToProps = createStructuredSelector({
  profilesInfo: selectProfileInfo,
  currentUser: selectCurrentUser,
  recieverInfo: selectReceiverInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessagingBox);

import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./Message-box.scss";

function MessageBox({
  messageData,
  incrementLikesPending,
  fetchMessage,
  scrollPosition,
  sendMsgRequest,
  currentUser
}) {
  const { name, message, date, likes, image, userid } = messageData;
  const [images, setImages] = useState(true);
  const [canLike, setCanLike] = useState(true);
  const [onProfileImage,setOnProfileImage] = useState(true);

  const incrementLikes = async () => {
    await incrementLikesPending(messageData);
    fetchMessage();
    sendMsgRequest();
  };
  const imageToggle = () => {
    setImages(false);
  };

  const toggleLike = () => {
    setCanLike(false);
  };
  return (
    <div>
      {messageData ? (
        <div>
          <ul id="message-box-container">
          {onProfileImage ?
          <img id = 'message-box-profile'    src={`      https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile${userid}?alt=media&token=e4485410-0836-4e25-b5e0-754eed7aec02`}
                alt='profile' height ='34' width ='30' onError ={()=> setOnProfileImage(false)}/>
          : null}
            <span id = 'message-box-name'> {name}: </span>
            <span id="message-box-message"> {message}</span>
            <span id="message-box-likes">{likes}</span>
            {canLike ? (
              <span
                id="message-box-button"
                onClick={() => {
                  incrementLikes();
                  toggleLike();
                }}
              >
                {" "}
                +
              </span>
            ) : (
              <span id="message-box-button"> +</span>
            )}
            <span id="message-box-date">at {date.slice(0, 10)}</span>
          </ul>

          {images ? (
            image ? (
              <LazyLoadImage
                id="message-box-image"
                onError={imageToggle}
                src={image}
                alt="upload"
                scrollPosition={scrollPosition}
                effect="blur"
              />
            ) : //eslint-disable
            null
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(MessageBox);

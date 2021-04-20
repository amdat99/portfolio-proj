import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPlayer from 'react-player/lazy'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {selectCurrentUser} from "../../redux/user/user.selectors"

import "./Message-box.scss";

function MessageBox({
  messageData,
  incrementLikesPending,
  fetchMessage,
  scrollPosition,
  sendMsgRequest,
  currentUser,
  
}) {
  const { name, message, date, likes, image, userid,video } = messageData;
  const [images, setImages] = useState(true);
  const [canLike, setCanLike] = useState(true);
  const [onProfileImage,setOnProfileImage] = useState(true);
  const [onVid, setOnVid] = useState(true);
  const [vidReady, setVidReady] = useState(false);

  const incrementLikes = async () => {
    await incrementLikesPending(messageData);
    fetchMessage();
    sendMsgRequest();
  };
  const imageToggle = () => {
    setImages(false);
  };

  const vidToggle = () => {
    setOnVid(false);
  }

  const toggleVideoReady = () => {
    setVidReady(true);
  }

  const toggleLike = () => {
    setCanLike(false);
  };



  return (
    <div>
      {messageData ? (
        <div>
          
          <ul id={"message-box-container"} >
          { currentUser ?
          
          onProfileImage && userid !== currentUser.profileId.toString() ?
            
            // https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile${userid}?alt=media&token=e4485410-0836-4e25-b5e0-754eed7aec02`}
          
      
            <img id = 'message-box-profile'    src={`https://firebasestorage.googleapis.com/v0/b/aamir-project-492ef.appspot.com/o/images%2Fprofile${userid}?alt=media&token=b54a3d9a-0bac-44b8-9035-717aa90cb4e6`}  
                alt='profile' height ='34' width ='30' onError ={()=> setOnProfileImage(false)}/>
          : null
            :  onProfileImage? <img id = 'message-box-profile'    src={`https://firebasestorage.googleapis.com/v0/b/aamir-project-492ef.appspot.com/o/images%2Fprofile${userid}?alt=media&token=b54a3d9a-0bac-44b8-9035-717aa90cb4e6`}  
                alt='profile' height ='34' width ='30' onError ={()=> setOnProfileImage(false)}/>
              :null}
          {currentUser
          ?userid !== currentUser.profileId.toString()
            ?<span id = 'message-box-name'> {name}: </span>
          : null 
          : <span id = 'message-box-name'> {name}: </span>} 
  
           {currentUser ? 
           <span  id= {userid === currentUser.profileId.toString()? 'message-box-message-s':"message-box-message"} > {message}</span>
             : <span  id= "message-box-message" > {message}</span>}
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
            {currentUser?
            <span id={userid !== currentUser.profileId.toString()?"message-box-date":'message-box-date-s'}>at {date.slice(0, 10)}</span>
            : <span id="message-box-date">at {date.slice(0, 10)}</span>}
          </ul>

          {images ? (
            image ? (
              currentUser?
              userid !== currentUser.profileId.toString()?
              <LazyLoadImage
              id={"message-box-image"}
                onError={imageToggle}
                src={image}
                alt="upload"
                scrollPosition={scrollPosition}
                effect="blur"
              />
              :      <LazyLoadImage
              id={"message-box-image-s"}
                onError={imageToggle}
                src={image}
                alt="upload"
                scrollPosition={scrollPosition}
                effect="blur"
              />
              :<LazyLoadImage
              id={"message-box-image"}
                onError={imageToggle}
                src={image}
                alt="upload"
                scrollPosition={scrollPosition}
                effect="blur"
              />
              ) : //eslint-disable
            null
          ) : null}
          {currentUser?
          onVid && userid === currentUser.profileId.toString()  ? 

    
          <ReactPlayer url={video} controls width={vidReady?"200px": '0px'} height={vidReady?"150px": '0px'} 
              onError={vidToggle} onReady={toggleVideoReady} id= 'message-box-vid' />
     
        :      <ReactPlayer url={video} controls width={vidReady?"200px": '0px'} height={vidReady?"150px": '0px'} 
        onError={vidToggle} onReady={toggleVideoReady} />
        : onVid?
        <ReactPlayer url={video} controls width={vidReady?"200px": '0px'} height={vidReady?"150px": '0px'} 
        onError={vidToggle} onReady={toggleVideoReady} />
        : null}
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,

});
export default connect(mapStateToProps)(React.memo(MessageBox));

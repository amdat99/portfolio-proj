import React ,{useState} from 'react';

import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import {  incrementLikesPending } from '../../redux/messages/messages.actions'

import './Message-box.scss'

function MessageBox({messageData, incrementLikesPending,fetchMessage}) {
    const {name,message,date,likes,image} = messageData;
    const [images, setImages] = useState(true)
    
    const incrementLikes = () =>{
        incrementLikesPending(messageData)
        fetchMessage();

     
        

    }

    const imageToggle = () =>{
        setImages(false);
       
    }

   
    return (

    <div >
{   images?
    <img id="message-box-image"  onError={imageToggle}
        src={image} alt= 'upload'  />
        :null}
      
    <ul id="message-box-container">
 
        <span>{name}:   </span>
    <span id='message-box-button' onClick={incrementLikes}>+</span>   
        <span id="message-box-message">  {message} {likes}</span> 
        <span id="message-box-date">at {date}</span> 
       
    </ul>
     
      
    </div>
    );
}

const mapDispatchToProps  = (dispatch) => ({
 
    incrementLikesPending: (messageData) => dispatch(incrementLikesPending(messageData))
 })

 export default connect(null,mapDispatchToProps)(MessageBox);
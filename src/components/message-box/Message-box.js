import React ,{useState} from 'react';

import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import {  incrementLikesPending } from '../../redux/messages/messages.actions'

import './Message-box.scss'

function MessageBox({messageData, incrementLikesPending,fetchMessage}) {
    const {name,message,date,likes,image} = messageData;
    const [images, setImages] = useState(image)
    
    const incrementLikes = () =>{
        incrementLikesPending(messageData)
        fetchMessage();

     
        

    }

    const imageToggle = () =>{
        setImages('https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png')
    }

   
    return (
    <div ><img id="message-box-image"  onError={imageToggle}
        src={images} alt= 'upload'  />
      
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
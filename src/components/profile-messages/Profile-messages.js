import React, {useState,useEffect} from 'react';
import { getRecievedMessageDoc} from '../../firebase/firebase'

import './Profile-messages.scss'


  function ProfileMessages({message, currentUser}) {
      const [recievedmessages, setRecievedMessages]= useState([])

      useEffect(()=>{
          getRecievedMessages()
        const interval = setInterval(() => getRecievedMessages()
        , 5000); 
     return () =>clearInterval(interval)
        },[getRecievedMessageDoc])
    
    const getRecievedMessages = async() => {
        const request = await getRecievedMessageDoc(currentUser.profileId)
        setRecievedMessages(request)
        console.log('jj',request)
        
      }
  
    return (
        <div className = 'profile-messages-container'>
             <ul id="message-box-container" >
            <span id="message-box-message"  className='profile-messages-sent'  >  {message.message} </span> 
            <span ></span> 
        </ul>

        {   
             recievedmessages.map( sentMessage =>
        <ul id="message-box-container" >
            <span>{sentMessage.senderName}:</span>
            <span id="message-box-message">  {sentMessage.message} </span> 
            <span id="message-box-date"></span> 
        </ul>
        )
        }
            
        </div>
    );
}

export default ProfileMessages;
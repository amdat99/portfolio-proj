import React, {useState,useEffect} from 'react';
import { getRecievedMessageDoc, getSentMessageDoc} from '../../firebase/firebase'

import './Profile-messages.scss'



  function ProfileMessages({ currentUser}) {
      const [recievedMessages, setRecievedMessages]= useState([])
      const [sentMessages, setSentMessages]= useState([])
       

    useEffect(()=>{
          getRecievedMessages()
        const interval = setInterval(() => getRecievedMessages()
        , 5000); 
     return () =>clearInterval(interval)
        },[recievedMessages])
        //eslint-disable
        
        useEffect(()=>{
            getSentMessages()
          const interval = setInterval(() => getSentMessages()
          , 5000); 
       return () =>clearInterval(interval)
          },[sentMessages])
          //eslint-disable
    

    const getRecievedMessages = async() => {
        const request = await getRecievedMessageDoc(currentUser.profileId)
        setRecievedMessages(request)}

    const getSentMessages = async() => {
        const request = await getSentMessageDoc(currentUser.profileId)
        setSentMessages(request)}
  
    return (

        <div className = 'profile-messages-container' >
        
        {recievedMessages.map((sentMessage,i) =>
         <ul key={i} id="message-box-container" >
            <span> {sentMessage.senderName}:</span>
            <span  id="message-box-message">  {sentMessage.message}  </span> 
            <span  id='profile-messages-recieved-date'>{sentMessage.createdAt}</span>
        </ul>)}
             
        {sentMessages.map(( message,i) =>
        <ul key={i} id="message-box-container" > 
            <span  id='profile-messages-sent'   >  {message.message} </span> 
            <span   id='profile-messages-sent-date' >to {message.recieverName} {message.createdAt} </span> 
            <span ></span> 
            
        </ul>)}
        )
        </div>
    );
}

export default React.memo(ProfileMessages);
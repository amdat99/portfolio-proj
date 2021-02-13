import React,{useEffect,useState} from 'react';

import MessageBox from '../../components/message-box/Message-box'
import UsersSidebar from '../../components/users-sidebar/Users-sidebar'

import {  selectCurrentUser } from '../../redux/user/user.selectors'
import { selectMessagesData, selectMessagesPending } from '../../redux/messages/messages.selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { changeStatus } from '../../redux/user/user.actions'
import { sendMessagePending, fetchMessagePending, incrementLikesPending } from '../../redux/messages/messages.actions'


import './Chat-page.scss'

function ChatPage({currentUser, sendMessagePending,fetchMessagePending,messages, changeStatus, pending}) {

const [searchField,setSearchField] =useState('')
const [messageData, setMessageData] = useState({userName:'', message:'', messageId:'', userId:'', image:'',})
 

useEffect(()=>{
    fetchMessagePending()
    
},[fetchMessagePending])

useEffect(()=>{
    if(currentUser !== null){
    setMessageData({userName:currentUser.displayName, userId:currentUser.id, messageId: Math.random()})
    changeStatus(currentUser.id,'online')}
    },[currentUser,changeStatus])

useEffect(()=>{
    const interval = setInterval(() => fetchMessagePending()
   , 5000); 
return () =>clearInterval(interval)
},[fetchMessagePending])

const handleChange = (event) => {
    setMessageData({...messageData, message:event.target.value})
}

const sendMessage =  async () => {

   await sendMessagePending(messageData)
   fetchMessagePending()
   setMessageData({userName:currentUser.displayName, userId:currentUser.id, messageId: Math.random() ,message: '', image: ''})
}

const addImageUrl = (event) => {
    setMessageData({...messageData, image:event.target.value})
    console.log('okl',messageData.image)
}

const onHandleSearch = (event) => {
    setSearchField(event.target.value)
}

const filteredMessages= () =>{
    return messages.filter( message =>{ 
    return message.name.toLowerCase().includes(searchField.toLowerCase());
    })
}

console.log(searchField)

return(
    <div>
    <input
      aria-label = 'Search name' className='chat-page-searchbox' type='search'
      placeholder='search name' onChange={onHandleSearch} />
    
    <form  className= 'chat-page-scroller hide-scroll' >
       
    { pending?<div className= 'loader'></div>:null}
        {filteredMessages().map(message =><MessageBox messageData = {message} key={message.messageid}
    fetchMessage = {fetchMessagePending} />
    ) }
    <textarea id="chat-page-send"
    type="text-area" placeholder="Enter Message" onChange={handleChange} required />

    <input type="url" placeholder="addImageUrl" onChange={addImageUrl} id="chat-page-image" />
    <button  id="chat-page-button" type ='button' onClick={sendMessage}>send</button>
    </form>

    <UsersSidebar searchField = {searchField}/>
    
    </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    messages: selectMessagesData,
    pending: selectMessagesPending
  })

 const mapDispatchToProps  = (dispatch) => ({
    sendMessagePending: messageData => dispatch(sendMessagePending(messageData)),
    fetchMessagePending: () => dispatch(fetchMessagePending()),
    incrementLikesPending: (messageId) => dispatch(incrementLikesPending(messageId)),
    changeStatus: (userId, status) => dispatch(changeStatus({userId, status}))
 })

  export default connect(mapStateToProps,mapDispatchToProps)(ChatPage);
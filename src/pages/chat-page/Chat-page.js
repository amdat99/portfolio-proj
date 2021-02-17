import React,{useEffect,useState,Suspense} from 'react';


// import MessageBox from '../../components/message-box/Message-box'
// import UsersSidebar from '../../components/users-sidebar/Users-sidebar'

import {  selectCurrentUser } from '../../redux/user/user.selectors'
import { selectMessagesData, selectMessagesPending } from '../../redux/messages/messages.selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { changeStatus } from '../../redux/profile/profile.actions'
import { sendMessagePending, fetchMessagePending, incrementLikesPending } from '../../redux/messages/messages.actions'


import './Chat-page.scss'

const MessageBox = React.lazy(() => import('../../components/message-box/Message-box'))
const UsersSidebar = React.lazy(() => import('../../components/users-sidebar/Users-sidebar'))

function ChatPage({currentUser, sendMessagePending,fetchMessagePending,messages, changeStatus, pending}) {

const [searchField,setSearchField] =useState('')
const [messageData, setMessageData] = useState({userName:'', message:'', messageId:'', userId:'', image:'',})
const [imageToggle, setImageToggle] = useState(false)
 


useEffect(()=>{
    fetchMessagePending()
    
},[fetchMessagePending])

useEffect(()=>{
    if(currentUser !== null){
    setMessageData({userName:currentUser.displayName, userId:currentUser.id, messageId: Math.random()})
    changeStatus(currentUser.profileId,'online')}
    console.log(currentUser)
    },[currentUser,changeStatus, sendMessagePending])

    
useEffect(()=>{
    const interval = setInterval(() => fetchMessagePending()
   , 4000); 
return () =>clearInterval(interval)
},[fetchMessagePending])

const handleChange = (event) => {
    setMessageData({...messageData, message:event.target.value})
}



function refreshPage() {
    window.location.reload(false);
  }


const sendMessage =  async (event) => {
    event.preventDefault();
    if(messageData.image){
     await toggleShowImage()}
 sendMessagePending(messageData)
   
   setMessageData({userName:currentUser.displayName, userId:currentUser.id, messageId: Math.random() ,message: '', image: ''})
   fetchMessagePending()
   setImageToggle(false)
   
}

// const handleSubmit = async (event) => {
//     event.preventDefault();
//     // =>
//    setItemsDoc(itemData)

//   if(error){
//     alert('there was an error', error.message)
//   }else{
//     setItemData( {name: '', price: '', description: '', category: '', picture: '', 
//     soldBy: currentUser.displayName, userId:currentUser.id, productId:Math.random()})
//     setImageToggle(false)
//     setSubmitToggle(false)
//   alert('your listing was successfully updated')
//   }
// }

const addImageUrl =  (event) => {
  
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


const verifyImage = () =>{

        setMessageData({ image:''})
        setImageToggle(false)
      
     
      
    }
  

  const toggleShowImage =()=>{
    setImageToggle(!imageToggle)

    const xhr = new XMLHttpRequest();   //verify image size 
      xhr.open("GET", messageData.image, true);
      xhr.responseType = "image/png";
      xhr.onreadystatechange = function() {
      if(this.readyState === this.DONE ) {
       const size = this.response.byteLength ;
       if (size > 2242880 ){
         alert("use an image under 2mb")
       }
      

    }
};
xhr.send(null);
 
  }

return(
    <div>
     <Suspense fallback ={<div className="loader"></div>}>
    <input
      aria-label = 'Search name' className='chat-page-searchbox' type='search'
      placeholder='search name' onChange={onHandleSearch} />
    
    <form  className= 'chat-page-scroller hide-scroll' onSubmit={sendMessage} >
       
    { pending?<div className= 'loader'></div>:null}
        {
            filteredMessages().map(message =>
       <MessageBox messageData = {message} key={message.messageid}
        fetchMessage = {fetchMessagePending} /> 
    ) }
    <textarea id="chat-page-send" value ={messageData.message}
    type="text-area" placeholder="Enter Message" onChange={handleChange} required />

    <input type="url" placeholder="addImageUrl" onChange={addImageUrl} id="chat-page-image" value ={messageData.image} />
    <button  id="chat-page-button" type ='submit'>send</button>
    </form>
            dfff
    <UsersSidebar searchField = {searchField}/>
    {imageToggle?
    <img src ={messageData.image}  onError={verifyImage}/>
        :null
    }</Suspense>
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
    changeStatus: (profileId, status) => dispatch(changeStatus({profileId, status}))
 })

  export default connect(mapStateToProps,mapDispatchToProps)(ChatPage);
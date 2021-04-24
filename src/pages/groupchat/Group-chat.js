import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentGroup,selectPending , selectGroupMessages} from "../../redux/groupchat/groupchat.selectors";
import { sendGroupMessagePending, fetchGroupMessagesPending} from "../../redux/groupchat/groupchat.actions"
import {selectCurrentUser } from "../../redux/user/user.selectors";
import { selectProfileName  } from "../../redux/user/user.selectors";
import {fetchNamePending} from "../../redux/user/user.actions"
import MessageBox from "../../components/message-box/Message-box"
import { selectProfileInfo } from "../../redux/profile/profile.selectors";
import { fetchProfileInfoPending } from "../../redux/profile/profile.actions";
import {createGroupPending, getGroupsPending, setCurrentGroup, fetchGroupDataPending } from "../../redux/groupchat/groupchat.actions"
import {selectGroupChats, selectGroupData} from "../../redux/groupchat/groupchat.selectors"

import {
 
  sendGroupMsgRequest,
  enterOnGroupMessage,
 
} from "../../sockets/sockets";

import GroupchatDropdown from "../../components/groupchat-dropdown/Groupchat-dropdown"

import './Group-chat.scss'

function GroupChat({ currentGroup, currentUser, profileName, pending,fetchProfileInfoPending, groupChats,
  fetchNamePending,sendGroupMessagePending, fetchGroupMessagesPending, groupMessages, profileInfo,createGroupPending, groupData, fetchGroupDataPending}) {
  
  const [confirmUser, setConfirmUser] = useState(false)
  //eslint-disable-next-line
  const [toggleGroupchat, setToggleGroupchat] = useState(false)
  // const [searchField, setSearchField] = useState("");
  const [messageData, setMessageData] = useState({
    userName: "",
    message: "",
    messageId: "",
    userId: "",
    image: "",
    video: "",
    groupId: "",
  });
  const [imageToggle, setImageToggle] = useState(false);
  const [mediaInput, setMediaInput] = useState(false);
const [mediaType, setMediaType] = useState('');
const [toggleAddUser , setToggleAddUser] = useState(false)
// const [toggleCreate, setToggleCreate] = useState(false);
const [groupChatData, setGroupChatData] = useState({
 
  groupId: "",
  groupName: "",
  userId: "",
  name: "",
});

const [uniqueId , setUniqueId] = useState([])

const [messageIds,setMessageIds] = useState([])



useEffect(() => {  // sockets 

    enterOnGroupMessage((err, data) => {
      if (err) return;

      if (data === 'message') {
        if(currentGroup){
          fetchGroupMessagesPending(currentGroup.id);
          }
        
      }
  });

})


const setGroupName = async () => {
 try{
   createGroupPending(groupChatData);
   alert("user added")
   setTimeout(function(){ fetchGroupDataPending(currentGroup.id) }, 1500);

 }catch(e){
     console.log('error',e)
  
 }
  
};

useEffect(() => {
  if(groupMessages && profileInfo){

    setMessageIds(groupMessages.map(message => message.userid))
  
  
  }
},[groupMessages,profileInfo])

useEffect(() => {
  if(currentGroup){
    fetchGroupDataPending(currentGroup.id)
  }
},[currentGroup, fetchGroupDataPending])

// useEffect(() => {
//   if(messageIds){
//     remeoveDuplicateIds()
//   }
// },[messageIds])

  useEffect(() => {
    if(currentGroup){
    fetchGroupMessagesPending(currentGroup.id);
    }
  }, [fetchGroupMessagesPending,currentGroup]);

  useEffect(() => {
      if (currentUser && profileName){
    setMessageData({
      userName: profileName.toString(),
      userId: currentUser.profileId,
      messageId: Math.random(),
      groupId: currentGroup.id,
    });
}
  }, [currentUser, profileName, currentGroup]);

  useEffect(() => {
    if(currentUser){
    fetchNamePending(currentUser.profileId)
    }
  }, [currentUser,fetchNamePending]);

  useEffect(() => {
    
    fetchProfileInfoPending();
    //eslint-disable-next-line
  },[])

  // const filteredMessages = () => {
  //   return groupMessages.filter((message) => {
  //     return message.name.toLowerCase().includes(searchField.toLowerCase());
  //   });
  // };

  const handleChange = (event) => {
  
    //   if(profileName){
    //   setMessageData({ ...messageData, userName: profileName})
    //   fetchNamePending(currentUser.profileId)
    //   }
    setMessageData({ ...messageData, message: event.target.value });


  };


  
  const sendMessage = async (event) => {
    event.preventDefault();
    await toggleShowImage();
    await sendGroupMessagePending(messageData);
   
    // sendMsgRequest();
      setMessageData({
        userName: profileName.toString(),
        userId: currentUser.id,
        messageId: Math.random(),
        groupId: currentGroup.id,
        message: "",
        image: "",
        video:''
      });
      sendGroupMsgRequest()
    setTimeout(function(){   fetchGroupMessagesPending(currentGroup.id);}, 1500);

 
    // setImageToggle(false);
  };  

  const verifyImage = () => {
    setMessageData({ image: "" });
    setImageToggle(false);
  };

  const toggleShowImage = () => {
    setImageToggle(!imageToggle);

    const xhr = new XMLHttpRequest(); //verify url image size
    xhr.open("GET", messageData.image, true);
    xhr.responseType = "image/png";
    xhr.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        const size = this.response.byteLength;
        if (size > 2242880) {
          alert("use an image under 2mb");
        }
      }
    };
    xhr.send(null);
  };


  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const remeoveDuplicateIds = () => {
    
    let unique = messageIds.filter(onlyUnique);
    setUniqueId(unique)
   
    
  }

  const incrementLikes = async (messageid) => {
    await fetch("https://aamirproject-api.herokuapp.com/incrementgrouplikes", {
      // fetch('http://localhost:4000/geodata',{
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageid: messageid
      }),
    })

   
        setTimeout(function(){ fetchGroupMessagesPending(currentGroup.id)}, 1000);
      
      
  };


// var filtered = profileInfo.filter(
//   function(e) {
//     return this.indexOf(e) < 0;
//   },
//   [2, 4]
// );
// console.log(filtered);

  return (
    <div>
{/* <span style={{position: 'relative' ,right: '100px', cursor: "pointer"}} onClick={()=> setToggleGroupchat(!toggleGroupchat)}>group chats</span> */}
<Link style={{position:'relative',left:'8%' ,bottom: '-80px' , cursor: "pointer"}} to='./chatapp'>Chat App</Link>
{ toggleGroupchat?
       currentUser?
       <div >
      <GroupchatDropdown currentUser = {currentUser} createGroupPending={createGroupPending} setCurrentGroup = {setCurrentGroup}
      groupChats = {groupChats} getGroupsPending = {getGroupsPending} />
      </div>
      : alert(' signin to see groupchats')
       : null}
  <div className="groupchat-invited hide-scroll">
    <p style ={{fontWeight:'bold' ,position:'relative' ,right: '5px'}}> Invited users</p>
    {groupData.map((data,i) =>
    <div key ={i} >
      <span style ={{position:'relative' ,right: '5px'}}>{data.name}</span>
      
      </div>
      )}
</div>
<Link style={{position:'relative',marginLeft: '-60%' ,bottom: '-80px' , cursor: "pointer"}} onClick={()=>setToggleAddUser(!toggleAddUser)}>Add user</Link>


{toggleAddUser && profileName && groupMessages

 
 ? <div className="groupchat-adduser hide-scroll">
 {profileInfo.map(profile => (
  <div key={profileInfo.profileId}>
<hr style = {{width:'200px'}}></hr>
    <div>
    <span id = ''>{profile.displayName}</span>
    <button style ={{marginLeft: '10px', background: '#2ca4ab'}} onClick={()=>{ setGroupChatData({...groupChatData, groupId: currentGroup.id, groupName: currentGroup.name, name: profile.displayName, userId: profile.profileId});  setConfirmUser(true); }}>
      Add to chat</button>
     
      </div>

    </div>
  ))} 
  { confirmUser
       ?<div className='groupchat-adduser-button'> 
       <button style ={{marginLeft: '10px', marginTop: '10px',background: '#2ca4ab'}} onClick={()=>{ setGroupName();  setConfirmUser(false); }} >confirm</button>
        <button onClick={()=>setConfirmUser(false)}>X</button>
        </div>
       : null}

  </div>
  
 
  : null}


        <h1 style={{color: '#2ca4ab'}}>group: {currentGroup.name}</h1>
      <form className="chat-page-scroller hide-scroll" onSubmit={sendMessage}>
        {pending ? <div className="loader"></div> : null}
        {groupMessages
          ? groupMessages.map((message) => (
              <MessageBox
                messageData={message}
                key={message.messageid}
                fetchMessage={fetchGroupMessagesPending}
                incrementLikesPending={incrementLikes}
                sendMsgRequest={sendGroupMsgRequest}
              />
            ))
          : null}

        <textarea
          id="chat-page-send"
          value={messageData.message}
          aria-label="add message"
          type="text-area"
          placeholder="Enter Messages"
          onChange={handleChange}
          required
        />

        {mediaInput ? (
          <div>
            <input
              type="url"
              placeholder={"add " + mediaType + " url"}
            onChange={mediaType === "image" ?  (event)=> {setMessageData ({ ...messageData, image: event.target.value }); console.log(mediaType) }: (e)=>setMessageData({ ...messageData,video: e.target.value})}
              id="chat-page-image"
              // value={messageData.image}
              aria-label="Add Media URl"
            />
            <button id="chat-page-imagebutt" onClick={()=> setMediaInput(false)}>
              X
            </button>
            <span
              style={{
                marginBottom: "23px",
                marginLeft: "24%",
                color: "#2CA4AB",
              }}
              id="chat-page-imagebutt"
            >
              {mediaType === "image" ? "Image" : "Video"}
            </span>
          </div>
        ) : null}
        {currentUser ? (
          <button id="chat-page-button" type="submit">
            send
          </button>
        ) : (
 
        null)}
      </form>

      <div className= 'chat-page-icons-g'>  
        <div onClick={()=> {setMediaType('image'); setMediaInput(true)}}
          style={{cursor: "pointer",marginRight: '150px',zIndex:'-1',position:'relative'}}>📷  Image</div>  

         <div  onClick={()=> {setMediaType('video'); setMediaInput(true)}}
                   style={{ marginLeft: '100px',position: 'relative',top: '-20px' ,cursor: 'pointer',zIndex:'-1' }} >🎥  Vid</div>
      </div> 
      {imageToggle ? (
          <img
            src={messageData.image}
            onError={verifyImage}
            alt="verify"
            width="5"
            height="5"
          />
        ) : null}    

        
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
    sendGroupMessagePending: (messageData) => dispatch(sendGroupMessagePending(messageData)),
    getProfileInfo: () => dispatch(fetchProfileInfoPending()),
 fetchNamePending: (profileId) => dispatch(fetchNamePending(profileId)),
 fetchGroupMessagesPending: (groupid) => dispatch(fetchGroupMessagesPending(groupid)),
 fetchProfileInfoPending: () => dispatch(fetchProfileInfoPending()),
 createGroupPending: (groupData) => dispatch(createGroupPending(groupData)),
 fetchGroupDataPending: (groupid) => dispatch(fetchGroupDataPending(groupid))
  });
  
const mapStateToProps = createStructuredSelector({
  currentGroup: selectCurrentGroup,
  pending: selectPending,
  currentUser: selectCurrentUser,
  profileName: selectProfileName,
  groupMessages : selectGroupMessages,
  profileInfo : selectProfileInfo,
  groupData : selectGroupData,
  groupChats: selectGroupChats,
});

export default connect(mapStateToProps,mapDispatchToProps)(GroupChat);

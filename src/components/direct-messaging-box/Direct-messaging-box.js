import React, {useState,useEffect} from 'react';


import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchProfileInfoPending } from '../../redux/profile/profile.actions'
import { sendDirectMessagePending } from '../../redux/user/user.actions'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectProfileInfo } from '../../redux/profile/profile.selectors'
import { openModal } from '../../redux/modal/modal.actions'

import {setMessageDoc} from '../../firebase/firebase'
import './Direct-messaging-box.scss'

function DirectMessagingBox({currentUser, profilesInfo, getProfileInfo, profileId, displayName, sendDirectMessagePending, openModal,toggleModal}) {
    const [messageData, setMessageData] = useState({message:'',senderName:'', senderId:'', recieverName:'', recieverId:'',})



    useEffect(()=>{
        getProfileInfo()
    },[getProfileInfo])

    useEffect(()=>{
        if(currentUser){
            setMessageData({senderName:currentUser.displayName, senderId:currentUser.profileId, recieverId:profileId, recieverName: displayName })
        }
    },[currentUser] )

  const onMessage = (event) => {
    setMessageData({...messageData, message:event.target.value})
    console.log(messageData)
    }

    const onSend =  async (event) => {
        event.preventDefault();
        if (currentUser.profileId !== profileId) {
    setMessageDoc(messageData)

    // await sendDirectMessagePending(messageData)
    setMessageData({senderName:currentUser.displayName, senderId:currentUser.profileId, recieverId: profileId ,message: '', recieverName: displayName})
        }else(alert('dont send yourself a message please'))
 }

    return (
        <div className='direct-messaging-container'>
        <form onSubmit={onSend}>
        <textarea id ='direct-messaging-input' onFocus = {openModal} onChange={onMessage} placeholder='type message'  required ></textarea>
        <button id='direct-messaging-button' type="submit">send</button>
        </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getProfileInfo: (messageData) =>dispatch(fetchProfileInfoPending(messageData)),
    sendDirectMessagePending: (messageData) => dispatch(sendDirectMessagePending(messageData)),
    openModal: () => dispatch(openModal())
    });

const mapStateToProps = createStructuredSelector({
    profilesInfo: selectProfileInfo,
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps,mapDispatchToProps)(DirectMessagingBox)


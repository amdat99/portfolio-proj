import React,{useState,useEffect, Suspense} from 'react';
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { toggleModal } from '../../redux/modal/modal.actions'
import { fetchProfileImagePending } from '../../redux/profile/profile.actions'
// import { selectProfileName } from '../../redux/profile/profile.selectors'
import {createStructuredSelector} from 'reselect'
import { selectToggledModal } from '../../redux/modal/modal.selectors'
import { selectCurrentUser, selectRecievedMessages, selectSentMessages } from '../../redux/user/user.selectors'
import { getRecievedMessagePending,getSentMessagePending} from '../../redux/user/user.actions'
import { selectCurrentImage } from '../../redux/profile/profile.selectors'
import { uploadImageToStorage,getRecievedMessageDoc, getSentMessageDoc, updateDisplayName,updateDisplayNameforUsers,getProfileName} from '../../firebase/firebase'
import { selectSellingItems, isSellingItemsLoaded,  } from '../../redux/shop/shop.selectors'
import { fetchSellingItemsPending, fetchProductPending } from '../../redux/shop/shop.actions'

import './Profile.scss'

const CartDropdown = React.lazy(() => import('../../components/cart/Cart-dropdown'));
const ListedItems = React.lazy(() => import('../../components/listed-items/Listed-items'));
const ProfileIconDropdown = React.lazy(() => import('./Profile-icon-dropdown'));
const ProfileMessages = React.lazy(() => import('../../components/profile-messages/Profile-messages'));

function Profile({toggleModal,currentUser,currentImage, getProfileImage,fetchSellingItemsPending, sellingItems,getSentMessagePending,getRecievedMessagePending,
    fetchProductPending,profileName}) {
    
    const [uploadDropdown, setUploadDropdown] = useState(false)
    const [shopToggle, setShopToggle] = useState(false)
    const [recievedMessages] = useState([])
    const [sentMessages, setSentMessages] = useState([])
    const [userName, setUserName] = useState('')
    const [displayNameData, setDisplayNameData] = useState('')
 
    useEffect(()=>{
        if(currentUser) {
        getProfileImage(currentUser.profileId)
        fetchProfileName()
       }
    },[currentUser,getProfileImage])
    //eslint-disable


    useEffect(()=>{
        if (currentUser)  {
        fetchSellingItemsPending(currentUser.profileId)
        getSentMessages()
        
        const interval = setInterval(() => getSentMessages()
         , 5000); 
         return () =>clearInterval(interval)
        }
      },[getSentMessageDoc,currentUser,fetchSellingItemsPending,sentMessages])
      //eslint-disable

    const toggleDropdown =  () => {
        setUploadDropdown(!uploadDropdown)
        }
    
    const fetchProfileName = async () => {
        <span id="profile-update-name" type="button" onClick={()=> {onUpdateName(); toggleModal()}}>update name</span>
        const request = await getProfileName(currentUser.profileId)
        setDisplayNameData(request)
   }

    const toggleShopFeatures = () =>{
        setShopToggle(!shopToggle)
    }   
       
    const getSentMessages = async() => {
        const request = await getSentMessageDoc(currentUser.profileId)
        await setSentMessages(request)
 
    }

    const onNameChange = (event) =>{
        setUserName(event.target.value)
    }

    const onUpdateName = () => {
        updateDisplayName(currentUser.profileId,userName)
        updateDisplayNameforUsers(currentUser.id,userName)
    }

 return (
    <div className="profile-container">
         
    { currentUser? 
  
      <div >
        <button  id="profile-shop-button" onClick = {toggleShopFeatures}>Toggle Profile</button>
      <div>
      <div id="profile-image-container">
        <a href= {currentImage}  >
        <img src={`${currentImage}size=60x60`} alt="profile" width= '60' height= '60'
        onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png"}}  />
        </a>
    </div>    
        <span onClick = {toggleDropdown} id= 'profile-image-update'>
            update Image
        </span>
<Suspense fallback ={<div className="loader"></div>}>
     {
        uploadDropdown?
    <div id= 'profile-image-update-dropdown'>
        <ProfileIconDropdown uploadImageToStorage = {uploadImageToStorage} currentUser={currentUser} toggleModal = {toggleModal}
         currentImag= {currentImage} getProfileImage = {getProfileImage}/>
    </div>
    :null}
</Suspense>
        { displayNameData? 
        displayNameData.map(name =>
        <input id="profile-greeting" type='text' placeholder={'Hello ' + name.displayName }  onChange={onNameChange} aria-label="change displa name" label='name' />
        ):null}
            <span id="profile-update-name" type="button" onClick={()=> {onUpdateName(); toggleModal()}}>update name</span>
    </div>
<Suspense fallback ={<div className="loader"></div>}>
     { shopToggle
?   <div>
    <div id='profile-cart'>
       <CartDropdown />
    </div> <div className="profile-selling-items hide-scroll">
        
        {sellingItems.length ?
            sellingItems.map(sellingItem =>
    <div > 
        <ListedItems sellingItem= {sellingItem} key={sellingItem.userId} fetchProductPending={fetchProductPending} />
     </div>
    ): <h1 id="profile-nosell">you are selling no items</h1>}</div>
    </div>:
    <div className="profile-messagebox-container hide-scroll ">  {
            
    currentUser?
    <div> 
        <span style={{position: 'relative', right: '-10px'}}>messages:</span>
        <ProfileMessages  sentMessages={sentMessages} currentUser={currentUser} recievedMessages={recievedMessages}/>
    </div>
        :<h1>no messages...</h1> } </div> }
    <div>

        
    </div>
</Suspense>
    </div> 
    :<Link to="/signon" onClick = {toggleModal}>sign in to view profile</Link> 
    }
        <button id="profile-modal-button" onClick={toggleModal}>X</button>
    </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    getProfileImage: (profileId) =>dispatch(fetchProfileImagePending(profileId)),
    toggleModal: () => dispatch(toggleModal()),
    fetchSellingItemsPending: (userId) => dispatch(fetchSellingItemsPending(userId)),
    getRecievedMessagePending: (profileId) => dispatch(getRecievedMessagePending(profileId)),
    getSentMessagePending: (userId) => dispatch(getSentMessagePending(userId)),
    fetchProductPending: (productId) => dispatch(fetchProductPending(productId)),
});

const mapStateToProps = createStructuredSelector({
    selectToggledModal: selectToggledModal,
    currentUser: selectCurrentUser,
    currentImage: selectCurrentImage,
    sellingItems: selectSellingItems,
    isSellingItemsLoaded: isSellingItemsLoaded,
    recievedMessages: selectRecievedMessages,
    sentMessages: selectSentMessages,


})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
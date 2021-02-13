import React,{useState,useEffect,useCallback} from 'react';
import CartDropdown from '../../components/cart/Cart-dropdown'
import ListedItems from '../../components/listed-items/Listed-items'
import ProfileIconDropdown from './Profile-icon-dropdown'

import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { toggleModal } from '../../redux/modal/modal.actions'
import { fetchProfileImagePending } from '../../redux/profile/profile.actions'
import {createStructuredSelector} from 'reselect'
import { selectToggledModal } from '../../redux/modal/modal.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCurrentImage } from '../../redux/profile/profile.selectors'
import { uploadImageToStorage,deleteListing} from '../../firebase/firebase'
import { selectSellingItems, isSellingItemsLoaded } from '../../redux/shop/shop.selectors'
import { fetchSellingItemsPending } from '../../redux/shop/shop.actions'

import './Profile.scss'
function Profile({toggleModal,currentUser,currentImage, getProfileImage,fetchSellingItemsPending, sellingItems,isSellingItemsLoaded}) {
    
    const [uploadDropdown, setUploadDropdown] = useState(false)


    useEffect(()=>{
        if(currentUser) {
        getProfileImage(currentUser.profileId)
        // updateDisplayName(currentUser.id,'aamir1')
       }
    },[currentUser,getProfileImage])

    useEffect(()=>{
        if (currentUser)  {
            fetchSellingItemsPending(currentUser.id)
            }
    },[currentUser,fetchSellingItemsPending])

    


const toggleDropdown =  () => {
    setUploadDropdown(!uploadDropdown)
}
       
 console.log(currentUser)
 
    return (
        <div className="profile-container">
 
      { currentUser? 
      <div >
      <div>
      <div id="profile-image-container">
        <a href= {currentImage}  >
        <img src={currentImage } alt="profile" width= '60' height= '60'
        onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png"}}  />
        </a>
    </div>    
     <span onClick = {toggleDropdown} id= 'profile-image-update'>
        update Image
    </span>
     {
        uploadDropdown?
    <div id= 'profile-image-update-dropdown'>
        <ProfileIconDropdown uploadImageToStorage = {uploadImageToStorage} currentUser={currentUser} toggleModal = {toggleModal}
         currentImag= {currentImage} getProfileImage = {getProfileImage}/>
    </div>
    :null}
        <h1 id="profile-greeting" >Hello {currentUser.displayName}</h1>
        </div>
     
        <div id='profile-cart'>
       <CartDropdown />
        </div> 
                
        {
            sellingItems !== [] ?
            sellingItems.map(sellingItem =>
            <div >
            <ListedItems sellingItem= {sellingItem} key={sellingItem.userId} />
            </div>
            ): <h1 id="profile-nosell">you are selling no items</h1>}
        
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
    fetchSellingItemsPending: (userId) => dispatch(fetchSellingItemsPending(userId))
});

const mapStateToProps = createStructuredSelector({
    selectToggledModal: selectToggledModal,
    currentUser: selectCurrentUser,
    currentImage: selectCurrentImage,
    sellingItems: selectSellingItems,
    isSellingItemsLoaded: isSellingItemsLoaded
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
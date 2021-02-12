import React ,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutPending, changeStatus } from '../../redux/user/user.actions';
import { toggleModal } from '../../redux/modal/modal.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentImage } from '../../redux/profile/profile.selectors'
import { fetchProfileImagePending} from '../../redux/profile/profile.actions'
import { createStructuredSelector } from 'reselect';

import './Profile-icon.scss'

function ProfileIcon({currentUser,signOutPending,toggleModal, currentImage,getProfileImage,changeStatus}) {
    const [profileToggle, setProfileToggle] = useState(false)

    useEffect(()=>{
        if(currentUser){
        getProfileImage(currentUser.profileId)}
    },[getProfileImage, currentUser])


    const dropdownToggle = () =>{
        setProfileToggle(!profileToggle)
    }

    const signOut = async ()  => {
        await changeStatus(currentUser.id,'offline')
        await signOutPending()
        // setTimeout(function() { refreshPage(); }, 1000);

        function refreshPage() {
            window.location.reload(false);
          }
        
    }
return (
        <div >
        <div className='profile-icon' onMouseEnter = { dropdownToggle} onMouseLeave = { dropdownToggle}>
            <div >
            Profile
            
            <img src={currentImage} alt= '' className='profile-icon-image' 
            width= '50' height= '50' onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png"}}
            />
            </div>
            
            {profileToggle
            ?<div className='profile-icon-dropdown'  >
            {
            currentUser
            ?<div onClick= {signOut  }>SIGN OUT</div>
            :<Link to ='/signon'>SIGN IN</Link>
           } 
           <Link onClick={ toggleModal }> 
           PROFILE
           </Link>
           <Link to="/store">STORE</Link>
           <Link to='/chatapp'>CHATAPP</Link>
            </div>
            :null}
            </div>
            
        </div>
    );
}

const mapStateToProps = (createStructuredSelector)  ({
    currentUser: selectCurrentUser,
    currentImage: selectCurrentImage


})

const mapDispatchToProps = (dispatch) => ({
    signOutPending: () => dispatch(signOutPending()),
    toggleModal: () => dispatch(toggleModal()),
    getProfileImage: (profileId) =>dispatch(fetchProfileImagePending(profileId)),
    changeStatus: (userId, status) => dispatch(changeStatus({userId, status}))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
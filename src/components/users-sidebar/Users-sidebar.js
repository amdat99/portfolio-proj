import React ,{useEffect, useState} from 'react';
import SidebarContent from './Sidebar-content'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchProfileInfoPending } from '../../redux/profile/profile.actions'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectProfileInfo } from '../../redux/profile/profile.selectors'
import { toggleModal } from '../../redux/modal/modal.actions'




import './Users-sidebar.scss'

function UsersSidebar({getProfileInfo, profilesInfo, searchField,currentUser,toggleModal}) {
    const [profiles] = useState(profilesInfo)

useEffect(()=>{
       
      getProfileInfo()
     
    },[getProfileInfo,currentUser])

    const filteredName= () =>{
        return profilesInfo.filter( profile =>{ 
        return profile.displayName.toLowerCase().includes(searchField.toLowerCase());
        })
    }
   
return (
        <div className="sidebar-container hide-scroll">
       
       {currentUser? null : 
       <div className="sidebar-test-profile">
        <h2>Test Profile</h2>
        <span>email: john@gmail.com password: 123456 </span>
       </div>
        }
       { profilesInfo?
        filteredName().map((data,i) =>
      
           <SidebarContent key = {i} data={data} toggleModal = {toggleModal} currentUser = {currentUser}/> )
          
       :null}
        </div>
    );
}
    const mapDispatchToProps = (dispatch) => ({
        getProfileInfo: () =>dispatch(fetchProfileInfoPending()),
        toggleModal: () => dispatch(toggleModal())
        });
    
    const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        profilesInfo: selectProfileInfo
})


export default connect(mapStateToProps,mapDispatchToProps)(UsersSidebar)
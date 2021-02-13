import React ,{useEffect, useState} from 'react';
import SidebarContent from './Sidebar-content'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchProfileInfoPending } from '../../redux/profile/profile.actions'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectProfileInfo } from '../../redux/profile/profile.selectors'



import './Users-sidebar.scss'

function UsersSidebar({getProfileInfo, profilesInfo, searchField}) {
    const [profiles] = useState(profilesInfo)

useEffect(()=>{
        getProfileInfo()
    },[getProfileInfo])

    const filteredName= () =>{
        return profiles.filter( profile =>{ 
        return profile.displayName.toLowerCase().includes(searchField.toLowerCase());
        })
    }
  
return (
        <div className="sidebar-container hide-scroll">
       {
            filteredName().map((data,i) =>
           <SidebarContent key = {i} data={data}  /> )
       }
        </div>
    );
}
    const mapDispatchToProps = (dispatch) => ({
        getProfileInfo: () =>dispatch(fetchProfileInfoPending()),
        });
    
    const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        profilesInfo: selectProfileInfo
})


export default connect(mapStateToProps,mapDispatchToProps)(UsersSidebar)
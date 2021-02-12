import React ,{useEffect} from 'react';
import SidebarContent from './Sidebar-content'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchProfileInfoPending } from '../../redux/profile/profile.actions'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectProfileInfo } from '../../redux/profile/profile.selectors'



import './Users-sidebar.scss'

function UsersSidebar({getProfileInfo, profileInfo}) {

useEffect(()=>{
        getProfileInfo()
    },[getProfileInfo])

return (
        <div className="sidebar-container hide-scroll">
        { profileInfo?
            profileInfo.map((data,i) =>
           <SidebarContent key = {i} data={data}  /> )
        :null}
        </div>
    );
}
    const mapDispatchToProps = (dispatch) => ({
        getProfileInfo: () =>dispatch(fetchProfileInfoPending()),
        });
    
    const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        profileInfo: selectProfileInfo
})


export default connect(mapStateToProps,mapDispatchToProps)(UsersSidebar)
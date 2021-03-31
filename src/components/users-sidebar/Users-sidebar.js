import React, { useEffect, useState } from "react";
import SidebarContent from "./Sidebar-content";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectProfileInfo } from "../../redux/profile/profile.selectors";
import { getReceiverInfo } from "../../redux/profile/profile.actions"
import { openMessageBox, openModal} from "../../redux/modal/modal.actions";

import "./Users-sidebar.scss";

function UsersSidebar({
  getProfileInfo,
  profilesInfo,
  searchField,
  currentUser,
  render,
  getReceiverInfo,
  openModal,
  openMessageBox
}) {
  const [profiles] = useState(profilesInfo);

  const filteredName = () => {
    console.log("p", profilesInfo);
    return profilesInfo.filter((profile) => {
      return profile.displayName
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });
  };

  return (
    <div className="sidebar-container hide-scroll">
    
        <div className="sidebar-test-profile">
          <h4>Test Profile</h4>
          <span id="sidebar-test">email: john@gmail.com password: 123456 </span>
    
        </div>

      {profilesInfo
        ? filteredName().map((data, i) => (
            <SidebarContent
              key={i}
              data={data}
              openModal={openModal}
              currentUser={currentUser}
              getReceiverInfo= {getReceiverInfo}
              openMessageBox = {openMessageBox}
            />
          ))
        : null}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(openModal()),
  getReceiverInfo: (profileData) => dispatch(getReceiverInfo(profileData)),
  openMessageBox: () => dispatch(openMessageBox())
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  profilesInfo: selectProfileInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSidebar);

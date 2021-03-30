import React, { useEffect, useState } from "react";
import SidebarContent from "./Sidebar-content";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectProfileInfo } from "../../redux/profile/profile.selectors";
import { getReceiverInfo } from "../../redux/profile/profile.actions"
import { toggleMessageBox, openModal} from "../../redux/modal/modal.actions";

import "./Users-sidebar.scss";

function UsersSidebar({
  getProfileInfo,
  profilesInfo,
  searchField,
  currentUser,
  render,
  getReceiverInfo,
  openModal,
  toggleMessageBox
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
      {currentUser ? null : (
        <div className="sidebar-test-profile">
          <h2>Test Profile</h2>
          <span>email: john@gmail.com password: 123456 </span>
          <span>{render}</span>
        </div>
      )}
      {profilesInfo
        ? filteredName().map((data, i) => (
            <SidebarContent
              key={i}
              data={data}
              openModal={openModal}
              currentUser={currentUser}
              getReceiverInfo= {getReceiverInfo}
              toggleMessageBox = {toggleMessageBox}
            />
          ))
        : null}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(openModal()),
  getReceiverInfo: (profileData) => dispatch(getReceiverInfo(profileData)),
  toggleMessageBox: () => dispatch(toggleMessageBox())
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  profilesInfo: selectProfileInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSidebar);

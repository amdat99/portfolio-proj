import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOutPending } from "../../redux/user/user.actions";
import { toggleModal } from "../../redux/modal/modal.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentImage } from "../../redux/profile/profile.selectors";
import {
  fetchProfileImagePending,
  changeStatus,
} from "../../redux/profile/profile.actions";
import { createStructuredSelector } from "reselect";
import "./Profile-icon.scss";

function ProfileIcon({
  currentUser,
  signOutPending,
  toggleModal,
  currentImage,
  getProfileImage,
  changeStatus,
}) {
  const [profileToggle, setProfileToggle] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getProfileImage(currentUser.profileId);
    }
  }, [getProfileImage, currentUser]);

  const dropdownToggle = () => {
    setProfileToggle(!profileToggle);
  };

  const onUpdateStatus = () => {
    changeStatus(currentUser.profileId, "offline");
  };

  const signOut = async () => {
    await onUpdateStatus();

    setTimeout(function () {
      signOutPending();
    }, 1200);
    setTimeout(function () {
      refreshPage();
    }, 2000);

    function refreshPage() {
      window.location.reload(false);
    }
  };
  return (
    <div>
      <div
        className="profile-icon"
        onMouseEnter={dropdownToggle}
        onMouseLeave={dropdownToggle}
      >
        <div>
          <img
            src={`${currentImage}?size=50x50`}
            alt=""
            className="profile-icon-image"
            width="50"
            height="50"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png";
            }}
          />
        </div>

        {profileToggle ? (
          <div className="profile-icon-dropdown">
            {currentUser ? (
              <div onClick={signOut}>SIGN OUT</div>
            ) : (
              <Link id="profile-icon-title" to="/signon">
                SIGN IN
              </Link>
            )}
            {currentUser ? (
              <Link onClick={toggleModal} id="profile-icon-title">
                PROFILE
              </Link>
            ) : null}
            <Link to="/store" id="profile-icon-title">
              STORE
            </Link>
            <Link to="/chatapp" id="profile-icon-title">
              CHATAPP
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentImage: selectCurrentImage,
});

const mapDispatchToProps = (dispatch) => ({
  signOutPending: () => dispatch(signOutPending()),
  toggleModal: () => dispatch(toggleModal()),
  getProfileImage: (profileId) => dispatch(fetchProfileImagePending(profileId)),
  changeStatus: (profileId, status) =>
    dispatch(changeStatus({ profileId, status })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);

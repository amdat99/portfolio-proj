import React, { useState } from "react";
import DirectMessagingBox from "../direct-messaging-box/Direct-messaging-box";

function SidebarContent({ data, toggleModal, currentUser }) {
  const [messageDropdown, setMessageDropdown] = useState(false);

  const toggleDropdown = () => {
    setMessageDropdown(!messageDropdown);
  };

  return (
    <div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      {currentUser ? (
        <div>
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile${data.profileId}?alt=media&token=ad802569-4766-419e-87ad-6ef6aa65b685`}
            alt="profile icon"
            width="60"
            height="60"
            className="sidebar-images"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png";
            }}
          />
          {data.status === "online" ? (
            <span className="sidebar-online">Signed in</span>
          ) : (
            <span className="sidebar-offline">offline</span>
          )}
          <span className="sidebar-name">{data.displayName}</span>
          {messageDropdown ? (
            <div>
              <DirectMessagingBox
                profileId={data.profileId}
                displayName={data.displayName}
                toggleModal={toggleModal}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(SidebarContent);

import React, { useState, useEffect } from "react";
import DirectMessagingBox from "../direct-messaging-box/Direct-messaging-box";

function SidebarContent({ data, openModal, currentUser, getReceiverInfo, toggleMessageBox }) {
  const [messageDropdown, setMessageDropdown] = useState(false);
  const [sendMessage, setSendMessage] = useState(true)
  const [profileInfo, setProfileInfo] = useState({recieverId:'' ,recieverName:''})

  useEffect(() => {
    setProfileInfo({recieverId:data.profileId , recieverName:data.displayName})

  },[setProfileInfo])

  const toggleDropdown = () => {
    setMessageDropdown(!messageDropdown);
  };

  const sendProfileInfo = async () => {
  
    await getReceiverInfo(profileInfo)
    toggleMessageBox()
    setProfileInfo({recieverId:'', recieverName:'',})
  }

  const toggleSendMessage = () => {
    setSendMessage(!sendMessage);
  };

  return (
    <div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      {currentUser ? (
        <div>
          
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/aamir-project-492ef.appspot.com/o/images%2Fprofile${data.profileId}?alt=media&token=fecd18b0-6c70-47fb-a1b1-fb4966943b18`}
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
            <div>{
              <div>
                
                  
         
                <div>
               <span onClick={()=>{sendProfileInfo(); openModal()}}>Send Message</span>
            
               </div>
{/*           
              //   profileId={data.profileId}
              //   displayName={data.displayName}
              //   toggleModal={toggleModal}
              // /> */}
            
                
              </div>
            }
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(SidebarContent);

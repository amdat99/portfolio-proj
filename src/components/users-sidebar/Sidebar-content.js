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

  }

  const toggleSendMessage = () => {
    setSendMessage(!sendMessage);
  };

  return (
    <div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
     
        <div>

          <img
            src={`        https://firebasestorage.googleapis.com/v0/b/aamir-project-492ef.appspot.com/o/images%2Fprofile${data.profileId}?alt=media&token=b54a3d9a-0bac-44b8-9035-717aa90cb4e6`}
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
                { currentUser ? 
               <span onClick={()=>{sendProfileInfo(); openModal()}}>Send Message</span>
                :<span style={{cursor: 'pointer'}} onClick={()=> alert('sign in to send a message')}>send Message</span>}
            
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
      
    </div>
  );
}

export default React.memo(SidebarContent);

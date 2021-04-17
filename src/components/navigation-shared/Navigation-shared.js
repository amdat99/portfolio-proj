import React,{useEffect} from "react";
import { Link } from "react-router-dom";

import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  initiateSocket,
  disconnectSocket
} from "../../sockets/sockets";
// import {ReactComponent as Logo } from '../../assets/logo.png'
import ProfileIcon from "../profile-icon/Profile-icon";

import { selectRoom } from "../../redux/messages/messages.selectors";

import ChatRoom from "../../pages/chat-room/Chat-Room";


import { Route } from "react-router-dom";

import "./Navigation-shared.scss";

function NavigationShared({room}) {

 useEffect(() => {
   if (room) initiateSocket(room)

  //  return(()=>{
  //    disconnectSocket()
  //  })
 })

  return (
    <div>
      <Route path="/chatroom" component={ChatRoom} />
  

      <div className="nav-shared-container">
        <div className="nav-shared-logo">
          <Link to="/">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png"
              height="30"
              width="30"
              alt="logo"
            />
          </Link>
          <div className="nav-shared-profileicon">
            <ProfileIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  room: selectRoom
})

export default connect(mapStateToProps)(NavigationShared);

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { changeStatus } from "../../redux/profile/profile.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { fetchNamePending } from "../../redux/user/user.actions"
import {sendProfileChange } from "../../sockets/sockets"

import "./Landing-page.scss";

function LandingPage({ currentUser, changeStatus, fetchNamePending }) {
  useEffect(() => {
    if (currentUser !== null) {
      changeStatus(currentUser.profileId, "online");
      fetchNamePending(currentUser.profileId)
      setTimeout(function(){ sendProfileChange() }, 2000);
    }
  }, [changeStatus, currentUser]);

  const shop =
    "https://cdn.pixabay.com/photo/2017/06/21/20/51/tshirt-2428521_960_720.jpg";
  const chat =
    "https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile1.041490457294241?alt=media&token=ad802569-4766-419e-87ad-6ef6aa65b685";

  return (
    <div>
      <div className="Landing-page-container">
        <div className="landing-page-box">
          <Link to="/store">
            <h1 className="landing-page-title">Enter The Store</h1>
            <div
              className="landing-page-links"
              style={{ backgroundImage: `url(${shop})` }}
            ></div>
          </Link>
        </div>

        <div className="landing-page-box">
          <Link to="/chatapp">
            <h1 className="landing-page-title">Enter the Chatapp</h1>
            <div
              className="landing-page-links"
              style={{ backgroundImage: `url(${chat})` }}
            ></div>
          </Link>
        </div>
      </div>

      <div className="landing-page-text-contaier">
        <p className="landing-page-text">
          <a
            className="landing-page-cv"
            href="https://drive.google.com/file/d/1z_376bSQJU7L9ihEX8qMxCzHvRnbbtNc/view?usp=sharing"
          >
            CV
          </a>
          <a
            className="landing-page-github"
            href="https://github.com/amdat99?tab=repositories"
          >
            Github
          </a>
          <br></br>
          Test Profile:
         john@gmail.com
          <br></br>
          password: 123456
          {/* <span style={{color: 'red'}}>*Somebody seems to sending 1000's of requests to the firebase server in a few minutes which is exausting the free 50k daily limit. For now I've set read access to users only.To access all features please use the test account: john@gmail.com password: 123456 OR quickly register an account or signin. The DDOSer  may be exceeding the signin limits of the test john account. Sorry if the firebase limits are exceeded. The chatapp mostly still functions without firebase. See my github for code implementations. </span> */}
          <br></br>
          <br></br>I have created a featured store application where users can
          buy and sell items as well as a chatapp which allows users to send
          messages and images. The chatapp also features direct messaging done
          through user profiles where users can also upload profile images.
           Futhermore, the app also has live video calling achieved through webRTC with and a socket-io 
          connection to send peer data. There are also call logs handled with a postgres backend and live chatrooms utilisng 
          socket-io. State management is handled throughout with redux and redux
          sagas for requests. The backend for the store is handled with
          firestore. The chatapp uses postgres with an express server providing
          connectivity with Knex. Stripe and accuweather Api's are also called
          in the server and implemented in the front-end. Some testing done with
          jest and enzyme. The app is a Pogressive web-app. Redux-logger
          kept as a dependency to show state management.
        </p>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  changeStatus: (profileId, status) =>
    dispatch(changeStatus({ profileId, status })),
 fetchNamePending: (profileId) => dispatch(fetchNamePending(profileId))
    
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

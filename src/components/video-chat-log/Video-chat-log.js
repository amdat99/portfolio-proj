import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { getReceiverInfo } from "../../redux/profile/profile.actions";

function VideoChatLog({ data, openVideoBox, beginCall, getReceiverInfo }) {
  const [, setProfileInfo] = useState({
    recieverId: "",
    recieverName: "",
  });

  useEffect(() => {
    setProfileInfo({
      recieverId: data.receiverid,
      recieverName: data.receiver,
    });
  }, [setProfileInfo, data.receiverid, data.receiver]);

  // const startVideoCall = async () => {
  //   await getReceiverInfo(profileInfo);
  //   beginCall();
  //   openVideoBox()
  //   setTimeout(function(){ beginCall() }, 1000);

  // }
  return (
    <div>
      {data.senderstatus === "missedcall" ? (
        <div>
          <span>
            {data.sender} called at {data.date.slice(0, 10)}{" "}
          </span>
          <span>call outgoing</span>
          {/* <button onClick={startVideoCall}>call</button> */}
        </div>
      ) : null}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getReceiverInfo: (profileData) => dispatch(getReceiverInfo(profileData)),
});

export default connect(null, mapDispatchToProps)(VideoChatLog);

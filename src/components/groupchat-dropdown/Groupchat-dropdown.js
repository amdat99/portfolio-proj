import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Groupchat-dropdown.scss";
function GroupchatDropdown({
  currentUser,
  createGroupPending,
  groupChats,
  getGroupsPending,
  setCurrentGroup
}) {
  const [groupChatData, setGroupChatData] = useState({
    creatorId: "",
    groupId: "",
    groupName: "",
    userId: "",
    name: "",
  });
  const [group, setGroup] = useState("");
  useEffect(() => {
    setGroupChatData({
      creatorId: currentUser.id,
      userId: currentUser.profileId,
      name: currentUser.displayName,
      groupId: (Math.random() * Math.random()) / Math.random(),
    });
  }, [currentUser]);

  useEffect(() => {
    getGroupsPending(currentUser.profileId);
  }, [createGroupPending]);

  const [toggleCreate, setToggleCreate] = useState(false);

  const setGroupName = async () => {
    await createGroupPending(groupChatData);
    //  await getGroupsPending(currentUser.profileId)
  };

  console.log(groupChatData);
  console.log(groupChats);

  return (
    <div className="groupc-dropdown-container">
      {groupChats ? (
        groupChats.map((group) => (
          <div key={group.groupid}>
            <span id= 'groupdropdown-name'>Group: {group.groupname}</span>
            <Link id = 'groupdropdown-join'to='./groupchat'  onClick={() =>setCurrentGroup({id:group.groupid ,name: group.groupname})}>join</Link>
            <hr></hr>
          </div>
        ))
      ) : (
        <span>you have no groups</span>
      )}
      <button style ={{ marginTop:'10px', background: '#2ca4ab'}} onClick={() => setToggleCreate(!toggleCreate)}>
        create group chat{" "}
      </button>

      {toggleCreate ? (
        <div>
          <input
            className="groupdrop-input"
            type="text"
            name="name"
            placeholder=" Group name:"
            onChange={(e) =>
              setGroupChatData({ ...groupChatData, groupName: e.target.value })
            }
            label="name"
            required
            style={{ width: "140px", height: "20px" }}
          />
          <button style={{background: '#2ca4ab'}} onClick={setGroupName}>create group</button>
        </div>
      ) : null}
    </div>
  );
}

export default GroupchatDropdown;

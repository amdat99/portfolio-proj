import React,{ useState, useEffect} from 'react';

function GroupchatDropdown({currentUser}) {
    const [groupChatData, setGroupChatData] = useState({creatorId: '',groupId:'',groupName: '',userId:'', name:''})
   const [group, setGroup] = useState('')
    useEffect(() => {
       setGroupChatData({creatorId: currentUser.id, userId: currentUser.profileId, name: currentUser.displayName, 
     groupId: (Math.random()* Math.random())/ Math.random()})
   })

   const setGroupName = async () => {
      await setGroupChatData({...groupChatData, groupName: group})

   }
   
    return (
        <div>
            <span>group chats</span>
    

            <button>create group chat </button>

        <h1 style={{ marginRight: "65px" }}>group chat</h1>

        <input
          className="sign-on-input"
          type="text"
          name="name"
          placeholder=" Group name:"
          onChange={(e)=> setGroup(e.target.value)}
          label="name"
          required
        />
        <button onClick={setGroupName}></button>


     
        </div>
    );
}

export default GroupchatDropdown;

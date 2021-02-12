import React from 'react';

function SidebarContent({data}) {
    return (
        <div>
        <div >
            <img src = {`https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile${data.profileId}?alt=media&token=ce847e64-0b8b-410e-b7f7-2ed82765f377`} alt = 'profile icon' 
            width="60"  height="60" className = 'sidebar-images' onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png"}}/> 
            { data.status === 'online' ?
                <span className = 'sidebar-online'>online</span>
                :<span className = 'sidebar-offline'>offline</span>
                }
            <span className= 'sidebar-name'>{data.displayName}</span> 
        </div>
        
        </div>
    );
}

export default SidebarContent;
import React, {useState, useEffect} from 'react';

function ProfileIconDropdown({uploadImageToStorage, currentUser, currentImage,getProfileImage,toggleModal}) {
    const [uploadProfileimage, setUploadprofileimage] = useState(null)
    
    useEffect(()=>{
      if(currentUser)  {
        getProfileImage(currentUser.profileId)
  
      }
  },[currentUser, getProfileImage,currentImage])
    
  
const handleImage = (event) => {
        setUploadprofileimage(event.target.files)
    }
    const imageUpload = async () => {   
     
        await uploadImageToStorage(uploadProfileimage,currentUser.profileId)  
        await getProfileImage(currentUser.profileId)
        toggleModal()
        
      }
    
    return (
        <div style ={{marginLeft: '100px'}}>
        <input type="file" onChange ={handleImage} />  
        <button onClick={imageUpload} type="button">send</button>
         </div>
    );
}

export default ProfileIconDropdown;
import React, { useState, useEffect } from "react";
import {sendProfileChange } from "../../sockets/sockets"
function ProfileIconDropdown({
  uploadImageToStorage,
  currentUser,
  currentImage,
  getProfileImage,
  toggleModal,
  fetchProfileInfoPending
}) {
  const [uploadProfileimage, setUploadprofileimage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getProfileImage(currentUser.profileId);
    }
  }, [currentUser, getProfileImage, currentImage]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file.size > 1024000) {
      alert("file is larger than 1mb");
    } else {
      setUploadprofileimage(event.target.files);
    }
  };

  const imageUpload = async (event) => {
    event.preventDefault();

    await uploadImageToStorage(uploadProfileimage, currentUser.profileId);
    await getProfileImage(currentUser.profileId);
    setUploadprofileimage(null);
    toggleModal();
    fetchProfileInfoPending()
    setTimeout(function(){ sendProfileChange() }, 2000);
    
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <form onSubmit={imageUpload}>
        <input
          type="file"
          onChange={handleImage}
          style={{ border: "1px solid black", background: "white" }}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default React.memo(ProfileIconDropdown);

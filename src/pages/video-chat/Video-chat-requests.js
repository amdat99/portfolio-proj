

export const sendVideoData = async (videoInfo) => {
  const {
    receiver,
    receiverId,
    receiverJoined,
    sender,
    senderId,
    videoId,
  } = videoInfo;

  if(!receiverId){
    
    return ('error')
  }
  await fetch("https://aamirproject-api.herokuapp.com/addvideoinfo", {

  // await fetch("http://localhost:4000/addvideoinfo", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      videoId: videoId,
      senderId: senderId,
      receiverId: receiverId,
      sender: sender,
      receiver: receiver,
      receiverJoined: receiverJoined,
    }),
  })
    .then((res) => res.json())
    
};

export const setMissedCall = async (videoId) => {
  await fetch("https://aamirproject-api.herokuapp.com/setmissedcall", {

  // await fetch("http://localhost:4000/setmissedcall", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      videoId: videoId,
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
};

export const fetchcallinfo = async (userId) => {
  await fetch("https://aamirproject-api.herokuapp.com/fetchcallinfo", {

  // await fetch("http://localhost:4000/fetchcallinfo", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId.toString(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};




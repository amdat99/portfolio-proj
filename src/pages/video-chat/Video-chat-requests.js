export const sendVideoData = async (videoData) => {
  const {
    receiver,
    receiverId,
    receiverJoined,
    sender,
    senderId,
    videoId,
  } = videoData;
  // await fetch("https://aamirproject-api.herokuapp.com/weathering", {

  await fetch("http://localhost:4000/addvideoinfo", {
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
    .then((data) => {});
};

export const sendRemoteSDP = async (receiverSDP, videoId) => {
  // await fetch("https://aamirproject-api.herokuapp.com/weathering", {

  await fetch("http://localhost:4000/addremotesdp", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      receiverSDP: receiverSDP,
      videoId: videoId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {});
};

export const fetchcallinfo = async (userId) => {
  // await fetch("https://aamirproject-api.herokuapp.com/weathering", {

  await fetch("http://localhost:4000/fetchcallinfo", {
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

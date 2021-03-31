import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCCUAnG030Pik83ErdX3DyHBqypx0qTM1A",
  authDomain: "aamir-project-492ef.firebaseapp.com",
  projectId: "aamir-project-492ef",
  storageBucket: "aamir-project-492ef.appspot.com",
  messagingSenderId: "926729331205",
  appId: "1:926729331205:web:623421273d59ce346ff26c",
  measurementId: "G-KGV9XG51P2"
};

//user functions:
export const createUserProfileDoc = async (userData, additionalData) => {
  // handles google and emailsignin
  if (!userData) return;
  const profileId = Math.random() + Math.random();
  const profileRef = firestore.doc(`profile/${profileId}`);
  const messageRef = firestore.doc(`messages/${profileId}`);
  const userRef = firestore.doc(`users/${userData.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    // createes new user info
    const { displayName, email, senderName, message } = userData;
    const createdAt = new Date();

    const status = "";
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        profileId,
        status,
        ...additionalData,
      });

      await profileRef.set({
        displayName,
        createdAt,
        profileId,
        status,
        ...additionalData,
      });
      await messageRef.set({
        displayName,
        createdAt,
        senderName,
        message,
        profileId,
        ...additionalData,
      });
    } catch (error) {
      console.error("error creating new user", error.message);
    }
  }
  return userRef;
};

export const updateDisplayName = async (profileId, name) => {
  if (!profileId) return;
  firestore
    .collection("profile")
    .where("profileId", "==", profileId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({ displayName: name });
      });
    });
};

export const updateDisplayNameforUsers = async (userId, name) => {
  firestore.collection("users").doc(userId).update({ displayName: name });
};

export const updateStatus = async (profileId, status) => {
  await firestore
    .collection("profile")
    .where("profileId", "==", profileId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({ status: status });
      });
    });
};

export const getProfileDoc = async (profileId) => {
  const collectionRef = firestore.collection("profile");
  // get user collection data
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => {
    return {
      profileId: doc.data().profileId,
      displayName: doc.data().displayName,
      status: doc.data().status,
    };
  });
};

export const getProfileName = async (profileId) => {
  const collectionRef = firestore
    .collection("profile")
    .where("profileId", "==", profileId);
  // get user collection data
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => {
    return { displayName: doc.data().displayName };
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // cheks to see if user is signedin
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      //if sign in state changes
      unsubscribe(); //unsubscribe/closes session
      resolve(userData);
    }, reject);
  });
};

//messaging functions:

export const setMessageDoc = async (messageData) => {
  const uid = Math.random() + Math.random();
  const collectionRef = firestore.doc(`message/${uid}`);
  const {
    senderId,
    message,
    senderName,
    recieverName,
    recieverId,
  } = messageData;
  const createdAt = new Date().toDateString();

  try {
    await collectionRef.set({
      message,
      recieverId,
      senderName,
      recieverName,
      createdAt,
      senderId,
    });
  } catch (error) {
    console.error("error creating new listing", error.message);
  }
};

export const getRecievedMessageDoc = async (recieverId) => {
  if (!recieverId) return;
  const collectionRef = firestore
    .collection("message")
    .orderBy("createdAt", "desc")
    .where("recieverId", "==", recieverId);
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => {
    return {
      senderName: doc.data().senderName,
      recieverName: doc.data().recieverName,
      message: doc.data().message,
      createdAt: doc.data().createdAt,
      senderId: doc.data().senderId,
 
    };
  });
 

};


export const getSentMessageDoc = async (senderId) => {
  if (!senderId) return;
  const collectionRef = firestore
    .collection("message")
    .orderBy("createdAt", "desc")
    .where("senderId", "==", senderId);
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => {
    return {
      message: doc.data().message,
      createdAt: doc.data().date,
      senderId: doc.data().senderId,
      recieverName: doc.data().recieverName,
      createdAt: doc.data().createdAt,
    };
  });
};

// shop functions:
export const setItemsDoc = async (itemData) => {
  const productId = itemData.productId + Math.random();
  const collectionRef = firestore.doc(`items/${productId}${itemData.userId}}`);
  const {
    price,
    category,
    soldBy,
    picture,
    description,
    userId,
    name,
  } = itemData;

  const createdAt = new Date();

  try {
    await collectionRef.set({
      name,
      price,
      category,
      soldBy,
      picture,
      description,
      userId,
      createdAt,
      productId,
    });
  } catch (error) {
    console.error("error creating new listing", error.message);
  }
};

// export const setItemsHistoryDoc = async ( itemData) =>{

//   const collectionRef = firestore.doc(`itemshistory/${itemData.productId}${itemData.userId}}`)
//   const name = itemData.name.toLowerCase();
//   const {  price, category, soldBy, picture, description,userId,name} = itemData;
//   const createdAt = new Date ();
//   const productId = itemData.productId+Math.random()
// try{
//   await collectionRef.set({
//     name, price, category, soldBy, picture, description, userId,
//     createdAt,productId,
//   })
// } catch(error){
//   console.error('error creating new listing', error.message);
// }

// }

export const getItemsDoc = async (collection) => {
  if (!collection) return;
  const collectionRef = firestore.collection(collection); // get user collection data
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => {
    return {
      name: doc.data().name,
      price: doc.data().price,
      category: doc.data().category,
      soldBy: doc.data().soldBy,
      picture: doc.data().picture,
      description: doc.data().description,
      createdAt: doc.data().createdAt,
      profileId: doc.data().productId,
    };
  });
};

export const getSellingItemsDoc = async (profileId) => {
  if (!profileId) return;
  const collectionRef = firestore
    .collection("items")
    .where("userId", "==", profileId);
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => doc.data());
};

export const deleteListing = async (userId, productId) => {
  if (!userId) return;
  const deleteRef = firestore
    .collection("items")
    .where("productId", "==", productId)
    .where("userId", "==", userId);
  deleteRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
  });
};

export const getCategoryDoc = async (collection, category) => {
  if (!collection) return;
  const collectionRef = firestore
    .collection(collection)
    .where("category", "==", category);
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => {
    return {
      name: doc.data().name,
      price: doc.data().price,
      category: doc.data().category,
      soldBy: doc.data().soldBy,
      picture: doc.data().picture,
      description: doc.data().description,
      createdAt: doc.data().createdAt,
      profileId: doc.data().productId,
    };
  });
};

export const getProductDoc = async (collection, productId) => {
  if (!productId) return;
  const collectionRef = firestore
    .collection(collection)
    .where("productId", "==", productId);

  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => doc.data());
};

export const getListedProductDoc = async (collection, soldBy) => {
  if (!soldBy) return;
  const collectionRef = firestore
    .collection(collection)
    .where("soldBy", "==", soldBy);

  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => doc.data());
};

export const getSearchFilteredDoc = async (collection, name) => {
  if (!name) return;
  const collectionRef = firestore
    .collection(collection)
    .where("name", ">=", name)
    .where("name", "<=", name + "\uf8ff");

  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map((doc) => {
    return {
      name: doc.data().name,
      price: doc.data().price,
      category: doc.data().category,
      soldBy: doc.data().soldBy,
      picture: doc.data().picture,
      description: doc.data().description,
      createdAt: doc.data().createdAt,
      profileId: doc.data().productId,
    };
  });
};

//profile picture functions:
export const uploadImageToStorage = (profileimage, profileId) => {
  if (!profileimage || !profileId) return;

  const imageRef = firebase.storage().ref().child(`images/profile${profileId}`);
  let file = profileimage[0];
  let uploadTask = imageRef.put(file);

  if (imageRef.exists) {
    // delete previous profile image
    imageRef.delete();
    return uploadImage(uploadTask);
  }

  return uploadImage(uploadTask);
};

const uploadImage = (uploadTask) => {
  try {
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL;
    });
  } catch (error) {
    console.error("error uploading new image", error.message);
  }
};

export const getImage = async (profileId) => {
  const imageRef = firebase.storage().ref().child(`images/profile${profileId}`);
  const image = await imageRef.getDownloadURL();
  try {
    return image;
  } catch (error) {
    console.error("error", error.message);
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleHandler = new firebase.auth.GoogleAuthProvider(); //handle signin prompt
googleHandler.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleHandler);

export default firebase;

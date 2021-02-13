import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'; 

const config = {
    apiKey: "AIzaSyCV-jxf099VUNmHcvk7J5FR5rzWr1za-Gc",
    authDomain: "tada-proj.firebaseapp.com",
    projectId: "tada-proj",
    storageBucket: "tada-proj.appspot.com",
    messagingSenderId: "452910579347",
    appId: "1:452910579347:web:8a8ab4e7a2856ce18a1766",
    measurementId: "G-38WWV7HX7T"
  };
  export const createUserProfileDoc = async (userData, additionalData) => { // handles google and emailsignin
    if (!userData) return

    const userRef = firestore.doc(`users/${userData.uid}`);
    const snapShot = await userRef.get();   
    if(!snapShot.exists){  // createes new user info 
      const { displayName, email} = userData;
      const createdAt = new Date();
      const profileId = Math.random()
      const status = ''
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          profileId,
          status,
          ...additionalData
        })
      } catch(error){
        console.error('error creating new user', error.message);
      }
    }
    return userRef;
  }

export const updateDisplayName = async (userId,name) =>{
  
    if (!userId) return
  let userRef= firestore.collection('users')
  return userRef.doc(userId).update({displayName:name})
}

export const updateStatus = async (userId,status) =>{

  console.log(status)
  if (!userId) return
let userRef= firestore.collection('users')
return userRef.doc(userId).update({status:status})
}

export const getProfileDoc = async () => {
 
 const collectionRef = firestore.collection('users');  // get user collection data
    const collectionSnapShot = await collectionRef.get(); // 
    return  collectionSnapShot.docs.map(doc => {
        return { profileId: doc.data().profileId , displayName: doc.data().displayName, status: doc.data().status}  
         } )
}
   export const setItemsDoc = async ( itemData) =>{
        
    // const verificationRef = firestore.collection('items') // verifies user to then allow to update listing
    // .where("userId", "==", itemData.userId)

    // if (verificationRef.exists){  //deletes document if same product is sent 
    //  const deleteRef = firestore.collection('items')
    //   .where("productId" ,"==", itemData.productId )
    //   deleteRef.delete().then(() => {
    //   })
    // }
    const productId = itemData.productId+Math.random()
   const collectionRef = firestore.doc(`items/${productId}${itemData.userId}}`)
   

    const {  price, category, soldBy, picture, description,userId,name} = itemData; 
    const createdAt = new Date ();
    
 try{
    await collectionRef.set({
      name, price, category, soldBy, picture, description, userId, 
      createdAt,productId,
    })
  } catch(error){
    console.error('error creating new listing', error.message);
  }

}

export const setItemsHistoryDoc = async ( itemData) =>{
     

  const collectionRef = firestore.doc(`itemshistory/${itemData.productId}${itemData.userId}}`)
  const name = itemData.name.toLowerCase();
  const {  price, category, soldBy, picture, description,userId} = itemData; 
  const createdAt = new Date ();
  const productId = itemData.productId+Math.random()
try{
  await collectionRef.set({
    name, price, category, soldBy, picture, description, userId, 
    createdAt,productId,
  })
} catch(error){
  console.error('error creating new listing', error.message);
}

}

export const getItemsDoc = async ( collection) => {
  if(!collection) return
 const collectionRef = firestore.collection(collection);  // get user collection data
    const collectionSnapShot = await collectionRef.get(); // 
    return  collectionSnapShot.docs.map(doc => {
        return {name: doc.data().name, price: doc.data().price, category: doc.data().category,
          soldBy: doc.data().soldBy,picture: doc.data().picture,description: doc.data().description,createdAt: doc.data().createdAt,
          profileId: doc.data().productId } 
         } )
}

export const getSellingItemsDoc = async (userId) => {
  if(!userId) return
  const collectionRef = firestore.collection('items').where('userId',"==",userId)
  const collectionSnapShot = await collectionRef.get(); // 
  return collectionSnapShot.docs.map(doc => doc.data())
}

export const deleteListing = async (userId,productId) => {
  if(!userId) return
const deleteRef=firestore.collection('items').where('productId', '==', productId).where('userId','==',userId)
    deleteRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  }

// var jobskill_query = db.collection('job_skills').where('job_id','==',post.job_id);
// jobskill_query.get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//     doc.ref.delete();
//   });
// });

export const getCategoryDoc = async ( collection, category) => {
  if(!collection) return
    const collectionRef = firestore.collection(collection)
    .where("category", "==", category)
    const collectionSnapShot = await collectionRef.get(); // 
    return  collectionSnapShot.docs.map(doc => {
        return {name: doc.data().name, price: doc.data().price, category: doc.data().category,
          soldBy: doc.data().soldBy,picture: doc.data().picture,description: doc.data().description,createdAt: doc.data().createdAt,
          profileId: doc.data().productId } 
         } )
       }

export const getProductDoc = async ( collection, productId) => {
  if(!productId) return
    const collectionRef = firestore.collection(collection)
      .where("productId", "==", productId)
  
      const collectionSnapShot = await collectionRef.get(); // 
      return collectionSnapShot.docs.map(doc => doc.data())
         }
  
  export const getListedProductDoc = async ( collection, soldBy) => {
    if (!soldBy) return
      const collectionRef = firestore.collection(collection)
      .where("soldBy", "==", soldBy)
        
      const collectionSnapShot = await collectionRef.get(); // 
      return collectionSnapShot.docs.map(doc => doc.data())
         } 
       

export const getSearchFilteredDoc = async ( collection, name) => {
  if(!name) return
    const collectionRef = firestore.collection(collection)
    .where("name", ">=", name)
    .where("name", "<=", name + "\uf8ff");
      
    const collectionSnapShot = await collectionRef.get(); // 
    return  collectionSnapShot.docs.map(doc => {
      return {name: doc.data().name, price: doc.data().price, category: doc.data().category,
        soldBy: doc.data().soldBy,picture: doc.data().picture,description: doc.data().description,createdAt: doc.data().createdAt,
        profileId: doc.data().productId } 
       } )
     }

    export const uploadImageToStorage =  (profileimage,profileId) => {
      if(!profileimage || !profileId) return

     const imageRef = firebase.storage().ref().child(`images/profile${profileId}`)
      let file = profileimage[0]
      let uploadTask = imageRef.put(file)
      
    if(imageRef.exists){   // delete previous profile image
        imageRef.delete()
        return uploadImage(uploadTask)
    } 
    
    return uploadImage(uploadTask)
   }
   
   const uploadImage = (uploadTask) => {
     try{uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
          let downloadURL = uploadTask.snapshot.downloadURL
        })}catch(error){
          console.error('error uploading new image', error.message);

        }}

   export const getImage = async (profileId) => {
    const imageRef = firebase.storage().ref().child(`images/profile${profileId}`)
    const image = await imageRef.getDownloadURL()
   try{
      return image
    }catch(error){
      console.error('error', error.message)
    }
   }
    
  
export const getCurrentUser =() => {  
  return new Promise((resolve, reject) => {  // cheks to see if user is signedin 
    const unsubscribe = auth.onAuthStateChanged(userData =>{ //if sign in state changes
      unsubscribe();      //unsubscribe/closes session
      resolve(userData)
    } ,reject)
  })
}

  firebase.initializeApp(config);

  export const auth = firebase.auth() 
  export const firestore = firebase.firestore()
  export const storage = firebase.storage()

  export const googleHandler = new firebase.auth.GoogleAuthProvider(); //handle signin prompt
  googleHandler.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleHandler);

  export default firebase;
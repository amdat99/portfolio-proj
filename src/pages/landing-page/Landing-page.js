import React, {useState,useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';


import './Landing-page.scss'
// const socket = useSocket()

function LandingPage(props) {
     


//     const[message, setMessage] = useState('')
//     const[id, setId] = useState()
//     const[messages, setMessages] = useState([])
    

//     const socketRef = useRef();
   
//    useEffect(() => {
//    socketRef.current = io.connect('http://localhost:3000',{ transport : ['websocket'] });
   
//    socketRef.current.on("id", id => {
//     setId(id);
//   })

//   socketRef.current.on("message", (message) => {
//     console.log("here");
//     receivedMessage(message);
//   })
// }, []);

// // function receivedMessage(message) {
// //   setMessages(oldMsgs => [...oldMsgs, message]);
// // }

// // function sendMessage(e) {
// //   e.preventDefault();
// //   const messageObject = {
// //     body: message,
// //     id: id,
// //   };
// //   setMessage("");
// //   socketRef.current.emit("send message", messageObject);
// // }

// // function handleChange(e) {
// //   setMessage(e.target.value);
// // }

   
const shop = 'https://cdn.pixabay.com/photo/2017/06/21/20/51/tshirt-2428521_960_720.jpg'
    const chat = 'https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile1.041490457294241?alt=media&token=ad802569-4766-419e-87ad-6ef6aa65b685'
   
   
   return (
       <div > 
       {/* <div className="test">dff
         {messages.map ((message, i )=> {
           if(message.id === id){
             return(
               <div>
                 <span>{message.body}</span>
               </div>
             )
           } return <div key ={i}>{message.body} </div>
         })}
   
         <form onsubmit = {sendMessage}>
           <textarea value ={message} onChange={handleChange} placeholder='message'>
   
           </textarea>
           <button type="submit">vvvvvvvvv</button>
         </form>
       </div> */}
    
    
    
    <div className="Landing-page-container">
   
    <div className="landing-page-box"> 
    <Link to='/store' >
        <h1 className = 'landing-page-title'>Enter The Store</h1></Link>
    <div className="landing-page-links"
        style={{ backgroundImage: `url(${shop})`}}>
    </div> 
    </div>    
    
   
   <Link to='/chatapp'>
    <div className="landing-page-box">
        <h1 className= 'landing-page-title'>Enter the Chatapp</h1>
    <div className="landing-page-links" 
     style={{ backgroundImage: `url(${chat})`}}>
     </div></div>
    </Link>   
    </div>
    </div>
    );
}

export default LandingPage;
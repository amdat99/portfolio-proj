import React,{createContext, useState, useEffect} from 'react';

export const MessageContext = createContext({
   
    messageInfo: [],
    sendMessageInfo: () => {},
    loading: null
})

const MessageProvider = ({children}) =>{

    const [messageInfo, setMessageInfo] = useState([])
  
console.log(messageInfo)


useEffect(() => {  //local storage persistance useEffect
        
    const data = localStorage.getItem("messages")
    if (data || data !== undefined) {
        setMessageInfo(JSON.parse(data))
    }
}, [])
useEffect(() => {
    if (messageInfo) {
        localStorage.setItem("messages", JSON.stringify(messageInfo))
    }
})


    // useEffect (() =>{

    //     fetch('http://localhost:4000/postmessage',{
    //         method: 'post',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //           message:this.state.postmessage ,
    //             name: this.state.currentuser,
    //         })
    //        })
    //        .then(response => response.json())
    //        .then(data=> {
    //         this.setState({ postmessage: data})
    //         this.setState({ currentuser: data})
    //     })

    // },[messageInfo])

    const sendMessageInfo = (messageData) => console.log(sendMessageInfo(messageData))

    return(
        <MessageContext.Provider
        value={{
         messageInfo,
         sendMessageInfo
    }}>{children}</MessageContext.Provider>
    )
}

export default MessageProvider

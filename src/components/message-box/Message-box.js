import React ,{useState} from 'react';



import './Message-box.scss'

function MessageBox({messageData, incrementLikesPending,fetchMessage}) {
    const {name,message,date,likes,image} = messageData;
    const [images, setImages] = useState(true)
    const [canLike, setCanLike] = useState(true)
    
    const incrementLikes = async () =>{
       await incrementLikesPending(messageData)
        fetchMessage();

}
    const imageToggle = () =>{
        setImages(false);
    }

    const toggleLike = () => {
        setCanLike(false);
    }
return (
    <div>
{  images?
    <div >

{ image ?
    <img id="message-box-image"  onError={imageToggle}
        src={image} alt= 'upload'  />
     :null  }       

</div>:null}
      
    <ul id="message-box-container">
        <span> {name}: </span>   
     
        <span id="message-box-message">  {message}</span>   
        <span id='message-box-likes'>{likes}</span>
        {  canLike ? 
        <span id='message-box-button' onClick={()=>{incrementLikes(); toggleLike()}}> +</span> 
        :<span id='message-box-button'>  +</span> 
         }
        <span id="message-box-date">at {date.toLocaleString()}</span> 
    </ul>
     </div>
    );
}


export default React.memo(MessageBox);
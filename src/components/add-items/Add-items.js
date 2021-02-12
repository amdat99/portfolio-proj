import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// import FormInput from '../formInput/FormInput';
// import CustomButton from '../custom-button/CustomButton';
import { connect } from 'react-redux'
import { setItemsDoc } from '../../firebase/firebase'
import { createStructuredSelector } from 'reselect'
import {  selectCurrentUser } from '../../redux/user/user.selectors'
import { selectErrorMessage } from '../../redux/shop/shop.selectors'

import './add-items.scss'

const AddItems = ({currentUser, error}) => {
  
  const[ itemData, setItemData] = 
    useState({ name: '', price: '', description: '', category: '', soldBy: '', picture: '', userId:'',productId: '',})
    const[imageToggle, setImageToggle] =useState(false)
    const[submitToggle, setSubmitToggle] =useState(false)

  useEffect(() =>{
      if(currentUser !== null){
        setItemData({soldBy: currentUser.displayName, userId: currentUser.id, productId: Math.random()})
       
    } 
    },[currentUser])


    const{ name, price, description,picture, } = itemData
     
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // =>
       setItemsDoc(itemData)
 
      if(error){
        alert('there was an error', error.message)
      }else{
        setItemData( {name: '', price: '', description: '', category: '', picture: '', 
        soldBy: currentUser.displayName, userId:currentUser.id, productId:Math.random()})
        setImageToggle(false)
        setSubmitToggle(false)
      alert('your listing was successfully updated')
      }
    }

  const handleChange = event => {
  const { name, value } = event.target;
  setItemData({ ...itemData,[name]:value})
  };

  const verifyImage = () =>{
    if(picture){
      setItemData({ picture:''})
      setImageToggle(false)
      setSubmitToggle(false)
      alert('your image is not valid')
      
    }
  }

  const toggleShowImage =()=>{
    setImageToggle(true)

    const xhr = new XMLHttpRequest();   //verify image size 
      xhr.open("GET", picture, true);
      xhr.responseType = "image/png";
      xhr.onreadystatechange = function() {
      if(this.readyState === this.DONE ) {
       const size = this.response.byteLength ;
       if (size > 2242880 ){
         alert("use an image under 2mb")
       }
       setSubmitToggle(true)

    }
};
xhr.send(null);
 
  }



const categories = ['electronics','clothes','shoes','food','general']

  return (
    <div >
  
   
   <form className='sign-on-container' onSubmit={handleSubmit}>  
       <h1>List your Item</h1>
 
        <input className='sign-on-input'
          type='text' name='name' placeholder='Enter the item name:'
          value={name} onChange={handleChange} label='name'required/>
        
        <input className='sign-on-input'
          type='number' name='price' placeholder='Enter the price'
          value={price} onChange={handleChange} label='Price' required/>
        
        <textarea className='sign-on-input add-items-description'
          type='text' name='description' placeholder ='Add your description'
          value={description} onChange={handleChange} label='description'
          required/>
          
         <p>Choose category</p>
          {categories.map((category,i) =>
          <div className='additems-categories' key={i}> { category} 
          <input className='' type='radio' name='category' 
          value={category} onChange={handleChange} label='category' required >
           </input> </div>)}
          
         <input className='sign-on-input'
          type='url' name='picture' placeholder ='enter a imageUrl'
          value={picture} onChange={handleChange} label='picture'
         required/>
          <button type='button'  onClick= {toggleShowImage}>VerifyImage</button>
      
        { currentUser 
        ? <div>
        {submitToggle
        ?<button  type='submit'>ADD ITEM</button>
        :  <button  type = 'button' onClick ={() => alert('verify image to sumbit item')}>ADD ITEM</button>
       }</div> 
       : <Link to='signon'> Sign in to List Items</Link>  }
      </form>
          {imageToggle
         ? <div>
      <img onError ={verifyImage}src={picture} alt='item' width='500' height='300'  /> 
     </div>
      :null
          }
    </div>
  );
}


// const mapDispatchToProps = dispatch => ({
//     addItemPending: itemInfo => dispatch(signUpPending(itemInfo))
// });

const mapStateToProps = createStructuredSelector({
  error: selectErrorMessage,
  currentUser: selectCurrentUser
})



export default connect(mapStateToProps)(AddItems);
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { fetchNamePending } from '../../redux/user/user.actions';
import {  selectProfileName} from "../../redux/user/user.selectors";
import { setReviewsDoc,getReviewsDoc, } from '../../firebase/firebase'

import './Add-review.scss'

function AddReview({currentUser,profileName,item,getReviewData}) {

   const [ratings, setRating] = useState([1,2,3,4,5]) 
    const [reviewData, setReviewData] = useState({userName: profileName.toString(), 
    productName: '', review: '',rating: '', userId: currentUser.profileId, productId: '' })

 

    useEffect(()=>{
      if(currentUser){
        setReviewData({userId: currentUser.profileId ,userName: profileName.toString() })
      }
    },[currentUser,profileName])

    useEffect(()=>{
      if(profileName){
        setReviewData({userName: currentUser.displayName})
      }
    },[profileName,currentUser]) 
    
    useEffect(()=>{
    if(currentUser){
    fetchNamePending(currentUser.profileId)
  }
  },[currentUser,profileName])

    useEffect(()=> {
      setReviewData({productName:item.name,productId: item.productId})
      
    },[item])
    
    useEffect(()=>{
      setReviewData({...reviewData,productName: item.name, productId: item.productId, userName: profileName.toString(), userId: currentUser.profileId})
    },[])
    const handleChange = (event) => {
     
        const { name, value } = event.target;
        setReviewData({ ...reviewData, [name]: value });
      };

      console.log(reviewData)


const onSendReview = async (event) => {
  event.preventDefault();
  await setReviewData({...reviewData,productName: item.name, productId: item.productId, userName: profileName.toString(), userId: currentUser.profileId})
  try{
   
   await setReviewsDoc(reviewData) 
   getReviewData()
    
  }catch(e){
    console.log('error setting review', e)
  }
}


   return (
        <div className = 'add-review-cont'>
        <form onSubmit ={onSendReview}>
        <input
          className=""
          type="text"
          name="review"
          placeholder="type your review"
        value={reviewData.review}
          onChange={handleChange}
          label="name"
          required
        />

<p>Choose Rating</p>
        {
        ratings.map((rating, i) => (
          <div className="additems-categories" key={i}>
            {" "}
            {rating}
            <input
              className=""
              type="radio"
              name="rating"
              value={rating}
              onChange={handleChange}
              label="rating"
              required
            ></input>{" "}
            
    </div>
        ))}

        
        <button >submit</button>
        </form >
        
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
    profileName: selectProfileName,

  });

  const mapDispatchToProps = (dispatch) => ({
    fetchNamePending: (profileId) => dispatch(fetchNamePending(profileId)),
  });
  

export default connect(mapStateToProps,mapDispatchToProps)(AddReview);
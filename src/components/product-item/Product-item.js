import React, { useState, useEffect } from "react";
import AddReview from "../../components/add-review/Add-review"
import { setReviewsDoc,getReviewsDoc, } from '../../firebase/firebase'
import "./Product-item.scss";

function ProductItem({ item, incrementItem,currentUser }) {
  const { name, price, picture, description, soldBy,productId } = item;
  const [toggleReview, setToggleReview] = useState(false)
  const [fethedReviews, setFetchedReviews] = useState(null) 

  useEffect(() => {
    if(item){
    getReviewData()
    }
  },[item])

  const lorem =
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."';

    const toggleButton = () => {
      setToggleReview(!toggleReview)
    }

    const getReviewData = async () => {
      getReviewsDoc(item.productId).then(data =>{
        setFetchedReviews(data)
      })
    }

    console.log('f',fethedReviews)
  return (
    <div id="product-item-container">
      <h3 id="product-item-name">{name.toUpperCase()}</h3>

      <img id="product-item-image" src={picture} alt="item" />

      <div id="product-item-overlay">
        <div id="product-item-labels">
          <span>
            {description}
            {lorem}
          </span>
          <h2 id="product-item-price">£{price}</h2>
          <span id="product-item-seller">seller: {soldBy}</span>
          <button
            onClick={() => incrementItem(item)}
            className="product-item-button"
          >
            Add to cart
          </button>
          {currentUser?
          <button id ='product-item-rbutton'onClick = {toggleButton}>Add Review</button>
          :<button id ='product-item-rbutton' onClick={()=>alert('sign in to leave a review')}>Add Review</button>}

          <div className='product-item-reviews'>
            <h4>Reviews</h4>
          {fethedReviews?
            fethedReviews.map(data =>
              <div key={data.productId}>
                <img   src={`        https://firebasestorage.googleapis.com/v0/b/aamir-project-492ef.appspot.com/o/images%2Fprofile${data.userId}?alt=media&token=b54a3d9a-0bac-44b8-9035-717aa90cb4e6`}
                alt='profile' width ='40'/>
              <span>{data.userName}: {'  '}  </span>
            <span>{  '  ', data.review}</span> {''}{'    rating: '}
              <span>{data.rating}</span>
                </div>
            )

          : <h3>no reviews</h3>}</div>
        </div>     
      </div>
    { toggleReview ?
    <AddReview item = {item} currentUser={currentUser} getReviewData = {getReviewData}/>  
:null} 
    </div>
  );
}

export default React.memo(ProductItem);

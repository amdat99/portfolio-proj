import React, { useState } from "react";
import AddReview from "../../components/add-review/Add-review"
import "./Product-item.scss";

function ProductItem({ item, incrementItem,currentUser }) {
  const { name, price, picture, description, soldBy,productId } = item;
  const [toggleReview, setToggleReview] = useState(false)

  const lorem =
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."';

    const toggleButton = () => {
      setToggleReview(!toggleReview)
    }
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
          <button onClick = {toggleButton}>Add Review</button>
        </div>     
      </div>
    { toggleReview ?
    <AddReview item = {item} currentUser={currentUser}/>  
:null} 
    </div>
  );
}

export default React.memo(ProductItem);

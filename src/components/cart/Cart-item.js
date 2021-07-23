import React from "react";

import "./Cart-item.scss";
import { Link } from "react-router-dom";

function CartContent({
  item,
  decrementItem,
  incrementItem,
  fetchProductPending,
  history,
}) {
  const { name, price, picture, quantity, profileId } = item;

  return (
    <div className="cart-item">
      <Link to="/product">
        <img
          src={`${picture}?100x75`}
          alt="item"
          width="60"
          style={{ cursor: "pointer" }}
          onClick={() => fetchProductPending(profileId)}
          className="imagetest"
        />
      </Link>
      <div className="cartitem-details">
        <span className="cartitem-name">{name}</span>
        <div className="cartitem-name">
          {quantity}x£{price}
        </div>
        <div className="cartitem-remove">
          <span
            className="cartitem-remove-span"
            onClick={() => decrementItem(item)}
          >
            {" "}
            {"remove   "}{" "}
          </span>
          <span
            className="cartitem-add-span"
            onClick={() => incrementItem(item)}
            style={{ position: "relative", left: "5px",cursor: "pointer" }}
          >
            add
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CartContent);

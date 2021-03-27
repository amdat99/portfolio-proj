import React from "react";
import { withRouter } from "react-router-dom";

// import { connect } from 'react-redux';
// import { isCategoryDataLoaded,selectCategory } from '../../redux/shop/shop.selectors'
// import { createStructuredSelector } from 'reselect';
// import {  fetchCategoryPending } from '../../redux/shop/shop.actions'

import "./Shop-menu.scss";

function ShopMenu({
  imageUrl,
  title,
  linkUrl,
  match,
  history,
  fetchCategoryPending,
}) {
  return (
    <div>
      <div className={`shopmenu-container`}>
        <div
          className="shopmenu-backgroundimg"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />

        <div
          className="shopmenu-content"
          onClick={() => history.push(`category/${linkUrl}`)}
        >
          <h1 className="shopmenu-title">{title.toUpperCase()} </h1>
          <span
            className="shopmenu-subtitle"
            onClick={() => history.push(`category/${linkUrl}`)}
          >
            SHOP NOW
          </span>
          {/* { categoryItems.map(item =>
  <ItemPreview item={item} key={item.productId} /> )
} */}
        </div>
      </div>
    </div>
  );
}

export default withRouter(ShopMenu);

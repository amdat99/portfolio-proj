import React, { Suspense, useEffect } from "react";

import ShopHeader from "../../components/shop-header/Shop-header";
import { addItem } from "../../redux/cart/cart.actions";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import {
  selectProduct,
  isProductDataLoaded,
} from "../../redux/shop/shop.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { fetchNamePending } from "../../redux/user/user.actions";
// import { fetchMessagePending } from "../../redux/messages/messages.actions";

const ProductItem = React.lazy(() =>
  import("../../components/product-item/Product-item")
);

export function ProductPage({ isLoaded, product, incrementItem, currentUser }) {
  useEffect(() => {
    if (currentUser) {
      fetchNamePending(currentUser.profileId);
    }
  }, [currentUser]);
  return (
    <div className="product-page-container">
      <ShopHeader />
      <Suspense fallback={<div className="loader"></div>}>
        {isLoaded ? (
          product.map((item) => (
            <ProductItem
              item={item}
              key={item.name}
              incrementItem={incrementItem}
              currentUser={currentUser}
            />
          ))
        ) : (
          <h1>LOADING...</h1>
        )}
      </Suspense>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  product: selectProduct,
  isLoaded: isProductDataLoaded,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  incrementItem: (item) => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

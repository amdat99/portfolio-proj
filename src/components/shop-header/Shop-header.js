import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBox from "../search-box/Search-box";
import CartDropdown from "../cart/Cart-dropdown";
import CartButton from "../cart/Cart-button";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { fetchCategoryPending } from "../../redux/shop/shop.actions";
// import { selectCurrentUser } from '../../redux/user/user.selectors';

import "./Shop-header.scss";

export function ShopHeader({ hidden, fetchCategoryPending }) {
  const [shopDropdown, setShopDropdown] = useState(false);
  const [categories] = useState([
    "electronics",
    "clothes",
    "shoes",
    "food",
    "general",
  ]);

  const onDropdownToggle = () => {
    setShopDropdown(!shopDropdown);
  };
  return (
    <div className="shopheader-container">
      <div className="shopheader-links">
        <div
          className="shopheader-labels"
          id="shopheader-hover"
          onMouseLeave={onDropdownToggle}
          onMouseEnter={onDropdownToggle}
        >
          <Link to="/store"> SHOP</Link>
          {shopDropdown ? (
            <div className="shopheader-dropdown">
              {categories.map((category, i) => (
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  className="shopheader-title"
                  onClick={() => fetchCategoryPending(category)}
                  key={i}
                >
                  {category}{" "}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div as="Link" className="shopheader-labels">
          <Link to="/listitems"> SEll ITEMS </Link>
        </div>
        {/* <div as= 'Link' className= 'shopheader-labels'><Link  to='/contact'> CONTACT US</Link></div> */}
        <CartButton />
        {hidden ? null : <CartDropdown />}
      </div>
      <Link to="/products">
        <SearchBox />
      </Link>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryPending: (category) => dispatch(fetchCategoryPending(category)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);

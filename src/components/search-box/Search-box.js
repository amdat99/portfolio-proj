import React from "react";
import { setSearchField } from "../../redux/shop/shop.actions";

import "./Search-box.scss";

import { connect } from "react-redux";

const SearchBox = ({ search }) => {
  return (
    <div>
      <input
        aria-label="Search Producs"
        className=" search-box "
        type="search"
        placeholder="search fields not supported by firestore"
        onChange={search}
      />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  search: (event) => dispatch(setSearchField(event.target.value)),
});

export default connect(null, mapDispatchToProps)(SearchBox);

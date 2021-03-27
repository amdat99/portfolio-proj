import React, { useEffect, useState } from "react";
import ItemsCollection from "../../components/items-collection/Items-collection";
import SharedHeader from "../../components/shared-header/Shared-header";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import {
  selectItems,
  isItemDataLoaded,
  selectErrorMessage,
} from "../../redux/shop/shop.selectors";

import { setHeaderRoute } from "../../redux/header/header.actions";

import "./Product-filter-page.scss";

function ProductsFilterPage({ collections, setHeaderRoute, isloaded }) {
  const [route] = useState("store");
  const [filteredCollections, setFilteredCollections] = useState([]);

  useEffect(() => {
    setHeaderRoute(route);
  }, [setHeaderRoute, route]);

  useEffect(() => {
    setFilteredCollections(collections);
  }, [collections]);

  const filterCollections = (params) => {
    switch (params) {
      case "electronics":
        return setFilteredCollections(
          collections.filter((collection) => {
            return collection.category.includes("electronics");
          })
        );
      case "clothes":
        return setFilteredCollections(
          collections.filter((collection) => {
            return collection.category.includes("clothes");
          })
        );
      case "shoes":
        return setFilteredCollections(
          collections.filter((collection) => {
            return collection.category.includes("shoes");
          })
        );
      case "food":
        return setFilteredCollections(
          collections.filter((collection) => {
            return collection.category.includes("food");
          })
        );
      case "general":
        return setFilteredCollections(
          collections.filter((collection) => {
            return collection.category.includes("general");
          })
        );

      default:
        return setFilteredCollections(collections);
    }
  };

  const resetCollections = () => {
    setFilteredCollections(collections);
  };

  return (
    <div className="product-filter-page">
      <SharedHeader />

      <div id="product-filter-filter-container">
        <span
          className="product-filter-filter-item"
          params="electronics"
          onClick={() => filterCollections("electronics")}
        >
          {" "}
          electronics
        </span>
        <span
          className="product-filter-filter-item"
          params="clothes"
          onClick={() => filterCollections("clothes")}
        >
          {" "}
          clothes
        </span>
        <span
          className="product-filter-filter-item"
          params="shoes"
          onClick={() => filterCollections("shoes")}
        >
          {" "}
          shoes
        </span>
        <span
          className="product-filter-filter-item"
          params="food"
          onClick={() => filterCollections("food")}
        >
          {" "}
          food
        </span>
        <span
          className="product-filter-filter-item"
          params="general"
          onClick={() => filterCollections("general")}
        >
          {" "}
          general
        </span>
      </div>
      <div
        id="product-filter-filter-container"
        style={{
          top: "133px",
          borderBottom: "1px solid black",
          cursor: "pointer",
        }}
        onClick={resetCollections}
      >
        {" "}
        reset
      </div>
      <h1 style={{ opacity: "0" }} id="product-filter-title">
        ''
      </h1>
      <div id="products-filter-spacing">
        {!isloaded ? (
          <h1 className="product-filter-searchtitle">Seacrh listed items</h1>
        ) : (
          <div className="products-filter-spacing">
            {filteredCollections.map((item, i) => (
              <ItemsCollection key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setHeaderRoute: (route) => dispatch(setHeaderRoute(route)),
});

const mapStateToProps = createStructuredSelector({
  collections: selectItems,
  isloaded: isItemDataLoaded,
  error: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterPage);

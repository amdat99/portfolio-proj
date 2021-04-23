import React, { useState, useEffect } from "react";
import AddReview from "../../components/add-review/Add-review";
import { getReviewsDoc } from "../../firebase/firebase";
import "./Product-item.scss";

function ProductItem({ item, incrementItem, currentUser }) {
  const { name, price, picture, description, soldBy } = item;
  const [toggleReviewBut, setToggleReviewBut] = useState(false);
  const [toggleReview, setToggleReview] = useState(false);

  const [fethedReviews, setFetchedReviews] = useState(null);

  useEffect(() => {
    if (item) {
      getReviewData();
    }
    //eslint-disable-next-line
  }, [item]);

  const lorem =
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."';

  const toggleButton = () => {
    setToggleReviewBut(!toggleReviewBut);
  };

  const onToggleReview = () => {
    setToggleReview(!toggleReview);
  };

  const getReviewData = async () => {
    getReviewsDoc(item.productId).then((data) => {
      if (data !== []) {
        setFetchedReviews(data);
      }
    });
  };

  console.log("f", fethedReviews);
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

          <button id="product-item-rbutton" onClick={onToggleReview}>
            Show Reviews
          </button>

          {toggleReview ? (
            <div>
              {toggleReviewBut ? (
                <AddReview
                  item={item}
                  currentUser={currentUser}
                  getReviewData={getReviewData}
                />
              ) : null}

              <div className="product-item-reviews">
                {currentUser ? (
                  <button id="product-item-rbutton" onClick={toggleButton}>
                    Add Review
                  </button>
                ) : (
                  <button
                    id="product-item-rbutton"
                    onClick={() => alert("sign in to leave a review")}
                  >
                    Add Review
                  </button>
                )}
                <h4>Reviews...</h4>
                {fethedReviews !== null ? (
                  fethedReviews.map((data, i) => (
                    <div key={i}>
                      {/*        ` https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile${data.userId}?alt=media&token=e4485410-0836-4e25-b5e0-754eed7aec02` */}
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/aamir-project-492ef.appspot.com/o/images%2Fprofile${data.userId}?alt=media&token=b54a3d9a-0bac-44b8-9035-717aa90cb4e6`}
                        alt="profile"
                        width="25"
                        style={{
                          width: "6%",
                          height: "35px",
                          borderRadius: "70px",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png";
                        }}
                      />
                      <span
                        style={{
                          width: "10%",
                          marginLeft: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {data.userName}:{" "}
                      </span>
                      <span style={{ maxWidth: "100px", marginLeft: "20px" }}>
                        {data.review}
                      </span>{" "}
                      {""}
                      <span
                        id={
                          data.rating >= 3
                            ? "review-rating-green"
                            : "review-rating-red"
                        }
                        style={{ width: "10%", marginLeft: "20px" }}
                      >
                        {" rating: "}
                        {data.rating}⭐
                      </span>
                      <hr />
                    </div>
                  ))
                ) : (
                  <h3>no reviews</h3>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductItem);

import React from "react";
import StripeCheckout from "react-stripe-checkout";

import { connect } from "react-redux";
import { clearAllItemsFromCart } from "../../redux/cart/cart.actions";

function StripeButton({ price, clearCart }) {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IBPzIJu0vryC2wBYlAbpDwAdguPArW50TXuXHXJHt8h76C3c4HAhBWrz7ujFXQ7ZMMPpGW7jGKLaFLBjABznIJ200cY63b1B1";

  const onToken = (token) => {
    fetch("https://quiet-inlet-52952.herokuapp.com/payment", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: priceForStripe,
        token: token,
      }),
    })
      .then((response) => {
        clearCart();
        alert("succesful payment");
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert("There was an issue with your payment");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="STORE"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is £${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="GBP"
    />
  );
}

const mapDispatchToProps = (dispatch) => ({
  clearCart: (items) => dispatch(clearAllItemsFromCart(items)),
});

export default connect(null, mapDispatchToProps)(StripeButton);

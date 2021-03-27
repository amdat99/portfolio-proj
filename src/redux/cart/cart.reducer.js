import cartActionTypes from "./cart.types";
import { addItemToCart, minusItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  purchase: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case cartActionTypes.MINUS_ITEM:
      return {
        ...state,
        cartItems: minusItemFromCart(state.cartItems, action.payload),
      };
    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.productId !== action.payload.productId
        ),
      };
    case cartActionTypes.CLEAR_ITEM_ALL_FROM_CART:
      return {
        ...state,
        cartItems: [],
      };

    case cartActionTypes.VERIFY_PURCHASE:
      return {
        ...state,
        purchase: !state.purchase,
      };

    default:
      return state;
  }
};

export default cartReducer;

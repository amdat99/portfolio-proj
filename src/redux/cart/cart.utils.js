// export const addItemToCart = (cartItems, cartItemToAdd) => {
//     const existingCartItem = cartItems.find(
//       cartItem => cartItem.productId === cartItemToAdd.productId
//     );
//     if(existingCartItem){
//         return cartItems.map(cartItem =>
//             cartItem.productId === cartItemToAdd.productId
//             ? {...cartItem, quantity: cartItem.quantity +1 }
//             : cartItem )
//     }
//         return [...cartItems, {...cartItemToAdd, quantity: 1}]
//     }

//     export const minusItemFromCart  = (cartItems, cartItemToMinus) => {
//         const existingCartItem = cartItems.find(
//           cartItem => cartItem.productId === cartItemToMinus.productId
//         );
//          if(existingCartItem.quantity === 1){
//         return cartItems.filter(cartItem =>
//         cartItem.productId !== cartItemToMinus.productId )}

//         return cartItems.map (cartItem =>
//             cartItem.productId === cartItemToMinus.productId
//             ? {...cartItem, quantity: cartItem.quantity -1 }
//             : cartItem )
//         }

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.profileId === cartItemToAdd.profileId
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.profileId === cartItemToAdd.profileId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const minusItemFromCart = (cartItems, cartItemToMinus) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.profileId === cartItemToMinus.profileId
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.profileId !== cartItemToMinus.profileId
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.profileId === cartItemToMinus.profileId
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

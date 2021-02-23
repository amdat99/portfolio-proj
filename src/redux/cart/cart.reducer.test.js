import CartActionTypes from './cart.types';
import cartReducer from './cart.reducer';

const initialState = {
    hidden: true,
    cartItems: [],
    purchase: false
};

describe('cartReducer', () => {
  it('expect inital state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it('expect hidden state to be false', () => {
    expect(cartReducer(initialState, { type: CartActionTypes.TOGGLE_CART_HIDDEN }).hidden
    ).toBe(false);
  });

  it('expect quantity should inrease by 1 if same productid is added', () => {
    const mockItem = {
      id: 1, quantity: 2
    };
    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id: 1, quantity: 1 }]
    };

    expect(cartReducer(mockPrevState, {
    type: CartActionTypes.ADD_ITEM, payload: mockItem }).cartItems[0].quantity
    ).toBe(3);
  });

  it('expect quantity should decrease by 1 if same productid is added', () => {
    const mockItem = {
      id: 1,quantity: 2
    };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id: 1, quantity: 1 }]
    };

    expect(cartReducer(mockPrevState, {
    type: CartActionTypes.MINUS_ITEM,payload: mockItem}).cartItems[0].quantity
    ).toBe(1);
  });

  it('expect item to be removed from cart if clear item is run with its productId', () => {
    const mockItem = {id: 1,quantity: 2 };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id: 1, quantity: 1 }]
    };

    expect(cartReducer(mockPrevState, {type: CartActionTypes.CLEAR_ITEM_FROM_CART, payload: mockItem})
    .cartItems.includes(item => item.id === 1)
    ).toBe(false);
  });

  it('expect cartItem to back to initial empty array', () => {
    const mockPrevState = {
      hidden: true,
      cartItems: [{ id: 1, quantity: 3 }, { id: 2, quantity: 1 }]
    };
    expect(cartReducer(mockPrevState, {type: CartActionTypes.CLEAR_ITEM_ALL_FROM_CART}).cartItems
    ).toStrictEqual([]);
  });
});

it('expect purchase to be true', () => {
    expect(cartReducer(initialState, { type: CartActionTypes.VERIFY_PURCHASE }).purchase
    ).toBe(true);
  });
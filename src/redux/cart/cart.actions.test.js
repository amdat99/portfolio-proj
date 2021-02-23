import CartActionTypes from './cart.types';
import {
  toggleCartHidden,
  addItem,
  minusItem,
  clearItemFromCart,
  clearAllItemsFromCart,
  onPurchase
} from './cart.actions';

describe('toggleCartHidden action', () => {
  it('expect togglearthidden action to be run', () => {
    expect(toggleCartHidden().type).toEqual(CartActionTypes.TOGGLE_CART_HIDDEN);
  });
});

describe('addItem action', () => {
  it('expect addItem to be run', () => {
    const mockItem = {
      profileId: 1
    };

    const action = addItem(mockItem);

    expect(action.type).toEqual(CartActionTypes.ADD_ITEM);
    expect(action.payload).toEqual(mockItem);
  });
});

describe('minus action', () => {
  it('expect minusItem to be called', () => {
    const mockItem = {
        profileId: 1
    };

    const action = minusItem(mockItem);

    expect(action.type).toEqual(CartActionTypes.MINUS_ITEM);
    expect(action.payload).toEqual(mockItem);
  });
});

describe('clearItemFromCart action', () => {
  it('expect clearItemFromCart action to be run', () => {
    const mockItem = {
        profileId: 1
    };

    const action = clearItemFromCart(mockItem);

    expect(action.type).toEqual(CartActionTypes.CLEAR_ITEM_FROM_CART);
    expect(action.payload).toEqual(mockItem);
  });
});

describe('clearCart action', () => {
  it('expect clearAllItemsFromCart to be run', () => {
    expect(clearAllItemsFromCart().type).toEqual(CartActionTypes.CLEAR_ITEM_ALL_FROM_CART);
  });
});

describe('onPurchase action', () => {
    it('expect onPurchase to be run', () => {
      expect(onPurchase().type).toEqual(CartActionTypes.VERIFY_PURCHASE);
    });
  });
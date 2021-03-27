import React from "react";

import { shallow, render, mount } from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";
import {
  toggleCartHidden,
  clearAllItemsFromCart,
} from "../../redux/cart/cart.actions";

import { CartDropdown } from "./Cart-dropdown";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
// describe('cart item', () => {

let mockDispatch;
let wrapper;
let wrapper2;
let mocktoggleCartHidden = jest.fn();
let mockclearCart = jest.fn();

beforeEach(() => {
  mockDispatch = jest.fn();

  const mockProps = {
    cartItems: {
      imageUrl: "piture",
      price: 18,
      name: "shoes",
      quantity: 1,
    },
    dispatch: mockDispatch,
    toggleCartHidden: mocktoggleCartHidden,
    clearCart: mockclearCart,
  };

  wrapper = toJson(shallow(<CartDropdown {...mockProps} />));
  wrapper2 = shallow(<CartDropdown {...mockProps} />);
});

it("expect to render cartDropdowncomponent", () => {
  expect(wrapper).toMatchSnapshot();
});

it("should call togglecart  when button clicks", () => {
  wrapper2.find(".cart-checkout-button").simulate("click");
  expect(mocktoggleCartHidden).toHaveBeenCalled();
});

it("should call clearcart  when button clicks", () => {
  wrapper2.find(".dropdown-clear-cart").simulate("click");
  expect(mockclearCart).toHaveBeenCalled();
});

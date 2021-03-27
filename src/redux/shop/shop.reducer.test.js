import shopActionTypes from "./shop.types";
import shopReducer from "./shop.reducer";

const initialState = {
  items: null,
  categoryItems: null,
  product: null,
  sellingItems: null,
  isPending: false,
  hasFailed: "",
};

describe("shop", () => {
  it("expect inital state", () => {
    expect(shopReducer(undefined, {})).toEqual(initialState);
  });
});

it("expect pending to be true and error to be null", () => {
  expect(
    shopReducer(initialState, { type: shopActionTypes.FETCH_ITEMS_PENDING })
      .isPending
  ).toBe(true);
  expect(
    shopReducer(initialState, { type: shopActionTypes.FETCH_ITEMS_PENDING })
      .hasFailed
  ).toBe("");
});

it("expect messageData payload to be added and pending to be false", () => {
  const mockData = {
    name: "ball",
  };
  expect(
    shopReducer(initialState, {
      type: shopActionTypes.FETCH_ITEMS_SUCCESS,
      payload: mockData,
    }).items
  ).toBe(mockData);
  expect(
    shopReducer(initialState, { type: shopActionTypes.FETCH_ITEMS_SUCCESS })
      .isPending
  ).toBe(false);
});

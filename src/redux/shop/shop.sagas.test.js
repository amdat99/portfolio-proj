import { takeLatest, call, put, all } from "redux-saga/effects";

import { fetchItemsAsync, fetchItemsPending } from "./shop.sagas";

import {
  getItemsDoc,
  getCategoryDoc,
  getProductDoc,
  getSearchFilteredDoc,
  getSellingItemsDoc,
} from "../../firebase/firebase";

import shopActionTypes from "./shop.types";
import {
  fetchItemsSuccess,
  fetchItemsFailed,
  fetchCategorySuccess,
  fetchProductSuccess,
  fetchSellingItemsSuccess,
} from "./shop.actions";

describe("fetchMessages async saga", () => {
  it("expect function to run when type is called", () => {
    const generator = fetchItemsPending();
    expect(generator.next().value).toEqual(
      takeLatest(shopActionTypes.FETCH_ITEMS_PENDING, fetchItemsAsync)
    );
  });

  it("expect data to be put to feth message failed if function was not  succesful", async () => {
    const generator = await fetchItemsAsync();
    generator.next();
    expect(generator.throw({ message: "error" }).value).toEqual(
      put(fetchItemsFailed({ message: "error" }))
    );
  });
});

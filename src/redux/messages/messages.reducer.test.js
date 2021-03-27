import messagesActionTypes from "./messages.types";
import messagesReducer from "./messages.reducer";

const initialState = {
  messageData: null,
  error: null,
  pending: false,
  messagesData: null,
  searchField: null,
};

describe("messagesReducer", () => {
  it("expect inital state", () => {
    expect(messagesReducer(undefined, {})).toEqual(initialState);
  });
});

it("expect pending to be true and error to be null", () => {
  expect(
    messagesReducer(initialState, {
      type: messagesActionTypes.SEND_MESSAGE_PENDING,
    }).pending
  ).toBe(true);
  expect(
    messagesReducer(initialState, {
      type: messagesActionTypes.SEND_MESSAGE_PENDING,
    }).error
  ).toBe(null);
});

it("expect messageData payload to be added and pending to be false", () => {
  const mockMessageData = {
    date: "2021-02-19T18:39:58.856Z",
    image: "http://localhost:3000/chatapp",
    likes: "2",
    message: "ss",
    messageid: "0.6504829427292409",
    name: "john",
  };
  expect(
    messagesReducer(initialState, {
      type: messagesActionTypes.SEND_MESSAGE_SUCCESS,
      payload: mockMessageData,
    }).messageData
  ).toBe(mockMessageData);
  expect(
    messagesReducer(initialState, {
      type: messagesActionTypes.SEND_MESSAGE_SUCCESS,
    }).pending
  ).toBe(false);
});

it("expect error payload and pending to be false", () => {
  const mockError = "error";
  expect(
    messagesReducer(initialState, {
      type: messagesActionTypes.SEND_MESSAGE_FAILED,
      payload: mockError,
    }).error
  ).toBe(mockError);
  expect(
    messagesReducer(initialState, {
      type: messagesActionTypes.SEND_MESSAGE_FAILED,
    }).pending
  ).toBe(false);
});

it("expect searchfield payload to be added", () => {
  const mockSearchField = "john";
  expect(
    messagesReducer(initialState, {
      type: messagesActionTypes.FILTER_MESSAGES,
      payload: mockSearchField,
    }).searchField
  ).toBe(mockSearchField);
});

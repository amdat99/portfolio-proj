import { all, call } from "redux-saga/effects";
// import { fetchCollectionsPendingAsync } from './shop/shop.actions';

import { userSagas } from "./user/user.sagas";
import { shopSagas } from "./shop/shop.sagas";
import { messagesSagas } from "./messages/messages.sagas";
import { profileSagas } from "./profile/profile.sagas";
import {groupchatSagas } from "./groupchat/groupchat.sagas";

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(shopSagas),
    call(messagesSagas),
    call(profileSagas),
    call(groupchatSagas)
  ]);
}

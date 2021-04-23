import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  getMessageFailed,
  sendDirectMessageFailed,
  getRecievedMessageSuccess,
  getSentMessageSuccess,
  fetchNameSuccess,
  fetchNameFailed,
} from "./user.actions";

import userActionTypes from "./user.types";

import { nullifyProfileImage } from "../profile/profile.actions";
import { clearAllItemsFromCart } from "../cart/cart.actions";

import {
  auth,
  googleHandler,
  createUserProfileDoc,
  getCurrentUser,
  updateStatus,
  setMessageDoc,
  getRecievedMessageDoc,
  getSentMessageDoc,
  getProfileName,
} from "../../firebase/firebase";

// import {sendProfileChange } from "../../sockets/sockets"

export function* getSnapshotFromUserAuth(userData, additionalData) {
  try {
    const userRef = yield call(createUserProfileDoc, userData, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleHandler);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* sendDirectMessageAsync({
  payload: { senderId, recieverId, message, senderName, recieverName },
}) {
  try {
    yield call(
      setMessageDoc,
      senderId,
      recieverId,
      message,
      senderName,
      recieverName
    );
  } catch (error) {
    yield put(sendDirectMessageFailed(error));
  }
}

export function* onGetProfileName({ payload: profileId }) {
  try {
    const profileName = yield getProfileName(profileId);
    yield put(fetchNameSuccess(profileName));
  } catch (error) {
    yield put(fetchNameFailed(error));
  }
}

export function* getSentMessageAsync({ payload: { userId } }) {
  try {
    const messagedata = yield getSentMessageDoc(userId);
    yield put(getSentMessageSuccess(messagedata));
  } catch (error) {
    yield put(getMessageFailed(error));
  }
}

export function* getRecievedMessageAsync({ payload: { profileId } }) {
  try {
    const messagedata = yield getRecievedMessageDoc(profileId);
    yield put(getRecievedMessageSuccess(messagedata));
  } catch (error) {
    yield put(getMessageFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userData = yield getCurrentUser();
    if (!userData) return;
    yield getSnapshotFromUserAuth(userData);
    yield updateStatus(userData.profileId, "online");
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onUpdateStatus() {
  const userData = yield getCurrentUser();
  yield call(updateStatus, userData.profileId);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield put(clearAllItemsFromCart());
    yield put(nullifyProfileImage());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInPending() {
  yield takeLatest(userActionTypes.GOOGLE_SIGNIN_PENDING, signInWithGoogle);
}

export function* onEmailSignInPending() {
  yield takeLatest(userActionTypes.EMAIL_SIGNIN_PENDING, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutPending() {
  yield takeLatest(userActionTypes.SIGNOUT_PENDING, signOut);
}

export function* onSignUpPending() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSendMessagePending() {
  yield takeLatest(
    userActionTypes.SEND_DIRECT_MESSAGE_PENDING,
    sendDirectMessageAsync
  );
}

export function* onGetSentMessagePending() {
  yield takeLatest(
    userActionTypes.GET_SENT_MESSAGE_PENDING,
    getSentMessageAsync
  );
}

export function* onGetRecievedMessagePending() {
  yield takeLatest(
    userActionTypes.GET_RECIEVED_MESSAGE_PENDING,
    getRecievedMessageAsync
  );
}

export function* onGetProfileNamePending() {
  yield takeLatest(userActionTypes.FETCH_NAME_PENDING, onGetProfileName);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInPending),
    call(onEmailSignInPending),
    call(onCheckUserSession),
    call(onSignOutPending),
    call(onSignUpPending),
    call(onSignUpSuccess),
    call(onSendMessagePending),
    call(onGetSentMessagePending),
    call(onGetRecievedMessagePending),
    call(onGetProfileNamePending),
  ]);
}

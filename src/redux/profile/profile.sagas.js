import { takeLatest, call, put, all }  from 'redux-saga/effects'
import {uploadImageToStorage, getImage, getProfileDoc, updateStatus} from '../../firebase/firebase'

import profileActionTypes from './profile.types';
import { fetchProfileImageSuccess, fetchProfileImageFailed,fetchProfileInfoSuccess } from './profile.actions';


export function* fetchProfileImageAsync({payload: profileId}) {
  try{
    const profileImageData =  yield call (getImage, profileId)  // passes in firestore collection name 
    yield put(fetchProfileImageSuccess(profileImageData))
}catch(error){
    yield put(fetchProfileImageFailed(error.message))

   }
}

export function * fetchProfileInfoAsync(){
    try{
        const profileInfo = yield call (getProfileDoc)
        yield put(fetchProfileInfoSuccess(profileInfo))
    }catch(error){
        yield put(fetchProfileImageFailed(error.message))
    
       }}


export function* uploadProfileImageAsync({ payload: {profileImage, profileId}}) {
    try{
      const profileImageData =  yield call (uploadImageToStorage,  profileImage ,profileId)  // passes in firestore collection name 
      yield put(fetchProfileImageSuccess(profileImageData))
  }catch(error){
      yield put(fetchProfileImageFailed(error.message))
  
     }
  }
  
  export function* changeUserStatus({payload: {profileId, status}}){
    console.log('d',{payload: {profileId, status}})
    try {
      yield call (updateStatus, profileId, status)
    }catch (error) {
      console.error('error', error.message)
    }
  }

  export function * onFetchProfileImagePending() {
    yield takeLatest(profileActionTypes.FETCH_PROFILEIMAGE_PENDING, fetchProfileImageAsync);
}

    export function * onFetchProfileInfoPending() {
        yield takeLatest(profileActionTypes.FETCH_PROFILEINFO_PENDING,  fetchProfileInfoAsync);
    }

    export function * onChangeUserStatus(){
        yield takeLatest(profileActionTypes.CHANGE_STATUS, changeUserStatus)
      }

export function * profileSagas() {
    yield all([
        call(onFetchProfileImagePending),
        call(onFetchProfileInfoPending),
        call(onChangeUserStatus)
])
}
import { takeLatest, call, put, all }  from 'redux-saga/effects'

import messagesActionTypes from './messages.types';
import { sendMessageSuccess, sendMessageFailed,fetchMessageSuccess,fetchMessageFailed, incrementLikesSuccess
,incrementLikesFailed} from './messages.actions';

export function* sendMessageAsync({payload: {message, userName, messageId, userId, image }}){
    try{
  const response = yield fetch('https://quiet-inlet-52952.herokuapp.com/addmessages',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message:message , userName: userName , messageId: messageId, userId: userId ,image:image
        })})
    const data = yield response.json();
       if(data.messageid){
           yield put(sendMessageSuccess({payload: {message, userName, messageId, userId,image }}))
       }}catch(error){
            yield put(sendMessageFailed(error))}
}



export function* fetchMessageAsync(){
    
    try{
        const response = yield fetch('https://quiet-inlet-52952.herokuapp.com/fetchmessages',{
              method: 'post',
              headers: {'Content-Type': 'application/json'},})
        const data = yield response.json()
        yield put(fetchMessageSuccess(data))
        }catch(error){
         yield put(fetchMessageFailed(error))}
}

export function* incrementLikesAsync({payload:{messageid}}){
    try{
        
    const response = yield fetch('https://quiet-inlet-52952.herokuapp.com/incrementlikes',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ messageid: messageid, })
    })   
    const data = yield response.json()
    yield put(incrementLikesSuccess(data))
    }catch(error){
    yield put(incrementLikesFailed(error))}
}



export function * onSendMessagePending() {
    yield takeLatest(messagesActionTypes.SEND_MESSAGE_PENDING, sendMessageAsync);
}


export function * onFetchMessagePending() {
    yield takeLatest(messagesActionTypes.FETCH_MESSAGE_PENDING, fetchMessageAsync);
}

export function * onIncrementLikesPending() {
    yield takeLatest(messagesActionTypes.INCREMENT_LIKES_PENDING, incrementLikesAsync);
}

export function * messagesSagas() {
    yield all([
        call(onSendMessagePending),
        call(onFetchMessagePending),
        call(onIncrementLikesPending),

    ])
}
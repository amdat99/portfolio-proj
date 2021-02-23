import { takeLatest, call, put, all }  from 'redux-saga/effects'

import messagesActionTypes from './messages.types';
import { sendMessageSuccess, sendMessageFailed,fetchMessageSuccess,fetchMessageFailed, incrementLikesSuccess
,incrementLikesFailed} from './messages.actions';

import { sendMessageAsync,fetchMessageAsync, onFetchMessagePending, incrementLikesAsync,onIncrementLikesPending, onSendMessagePending } from './messages.sagas'

describe('fetchMessages async saga', () => {
    it('expect function to run when type is called', () => {
      const generator = onFetchMessagePending();
      expect(generator.next().value).toEqual(
        takeLatest(messagesActionTypes.FETCH_MESSAGE_PENDING, fetchMessageAsync)
      );
    });
    

      
    it('expect data to be put to feth message failed if function was not  succesful', async () => {
        const generator = await fetchMessageAsync();
      generator.next()
        expect(generator.throw({ message: 'error' }).value).toEqual(
          put(fetchMessageFailed({ message: 'error' }))
        );
      });
});

describe('incrementlikes async saga', () => {
    it('expect function to run when type is called', () => {
      const generator = onIncrementLikesPending();
      expect(generator.next().value).toEqual(
        takeLatest(messagesActionTypes.INCREMENT_LIKES_PENDING, incrementLikesAsync)
      );
    });
  });

  describe('sendMessages async saga', () => {
    it('expect function to run when type is called', () => {
      const generator = onSendMessagePending();
      expect(generator.next().value).toEqual(
        takeLatest(messagesActionTypes.SEND_MESSAGE_PENDING, sendMessageAsync)
      );
    });
  });
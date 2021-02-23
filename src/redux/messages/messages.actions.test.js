import messagesActionTypes from './messages.types';
import {
sendMessagePending,
 fetchMessagePending,
 sendMessageSuccess,
 fetchMessageFailed,
 fetchMessageSuccess,
 incrementLikesPending,

incrementLikesSuccess,


} from './messages.actions';


  const mockMessage = {
        date: "2021-02-19T18:39:58.856Z",
        image: "http://localhost:3000/chatapp",
        likes: "2",
        message: "ss",
        messageid: "0.6504829427292409",
        name: "john",
    };


describe('fetchmessage pending action', () => {
  it('expect action to be run and have mock payload', () => {
  const action = sendMessagePending(mockMessage);
    expect(action.type).toEqual(messagesActionTypes.SEND_MESSAGE_PENDING);
    expect(action.payload).toEqual(mockMessage);
  });
});

describe('fetchMessagePending action', () => {
      it('expect action to be run', () => {
        expect(fetchMessagePending().type).toEqual(messagesActionTypes.FETCH_MESSAGE_PENDING);
      });
    });


describe('fetchmessage success action', () => {
    const mockFetchMessage ='hello'
    it('expect action to be run and have mock payload', () => {
    const action = fetchMessageSuccess(mockFetchMessage);
      expect(action.type).toEqual(messagesActionTypes.FETCH_MESSAGE_SUCCESS);
      expect(action.payload).toEqual(mockFetchMessage);
    });
  });
  
  describe('sendMessage success action', () => {
    const mockFetchMessage ='hello'
    it('expect action to be run and have mock payload', () => {
    const action = sendMessageSuccess(mockFetchMessage);
      expect(action.type).toEqual(messagesActionTypes.SEND_MESSAGE_SUCCESS);
      expect(action.payload).toEqual(mockFetchMessage);
    });
  });

  describe('fethMessage failed action', () => {
    const mockerror ='error'
    it('expect action to be run and have mock payload', () => {
    const action = fetchMessageFailed(mockerror);
      expect(action.type).toEqual(messagesActionTypes.FETCH_MESSAGE_FAILED);
      expect(action.payload).toEqual(mockerror);
    });
  });

  
  describe('increment likes pending  action', () => {
    const mockId ='123'
    it('expect action to be run and have mock payload', () => {
    const action = incrementLikesPending(mockId);
      expect(action.type).toEqual(messagesActionTypes.INCREMENT_LIKES_PENDING);
      expect(action.payload).toEqual(mockId);
    });
  });

  describe('increment likes success action', () => {
    it('expect action to be run', () => {
      expect(incrementLikesSuccess().type).toEqual(messagesActionTypes.INCREMENT_LIKES_SUCCESS);
    });
  });








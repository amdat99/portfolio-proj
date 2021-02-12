import { createSelector } from 'reselect'


const selectMessages  = (state) => state.messages;


export const selectMessagesData = createSelector(
 [selectMessages],
 (messages) => messages.messagesData? messages.messagesData : []

)
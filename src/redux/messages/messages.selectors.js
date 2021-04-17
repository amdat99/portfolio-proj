import { createSelector } from "reselect";

const selectMessages = (state) => state.messages;

export const selectMessagesData = createSelector([selectMessages], (messages) =>
  messages.messagesData ? messages.messagesData : []
);

export const selectMessagesPending = createSelector(
  [selectMessages],
  (messages) => messages.pending
);

export const selectVideoData = createSelector(
  [selectMessages],
  messages => messages.videoData 
)


export const selectRoom = createSelector(
  [selectMessages],
  messages => messages.room 
)

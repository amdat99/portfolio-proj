import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser ? user.currentUser : null
);

export const selectCurrentProfileId = createSelector(
  [selectUser],
  (user) => user.profileId
);
export const selectSentMessages = createSelector([selectUser], (user) =>
  user.sentMessage ? user.sentMessage : []
);

export const selectRecievedMessages = createSelector([selectUser], (user) =>
  user.recievedMessage ? user.recievedMessage : []
);

export const selectProfileName = createSelector([selectUser], (user) =>
  user.profileName ? user.profileName : []
);
export const selectErrorMessage = createSelector(
  [selectUser],
  (user) => user.error
);



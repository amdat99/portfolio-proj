import { createSelector } from "reselect";

const selectRoute = (state) => state.groupchat;

export const selectGroupChats = createSelector([selectRoute], (groupchat) =>
  groupchat.groupchats ? groupchat.groupchats : []
);

export const selectCurrentGroup = createSelector(
  [selectRoute],
  (groupchat) => groupchat.currentGroup
);

export const selectGroupMessages = createSelector(
    [selectRoute],
    (groupchat) => groupchat.groupmessages ? groupchat.groupmessages : []
)


export const selectPending = createSelector(
    [selectRoute],
    (groupchat) => groupchat.pending
  );

  export const selectGroupData = createSelector(
    [selectRoute],
    (groupchat) => groupchat.groupData ? groupchat.groupData : []
  )
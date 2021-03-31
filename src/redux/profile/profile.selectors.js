import { createSelector } from "reselect";

const selectProfile = (state) => state.profile;

export const selectCurrentImage = createSelector(
  [selectProfile],
  (profile) => (profile.profileImage ? profile.profileImage : [])
);

export const selectProfileInfo = createSelector(
  [selectProfile],
  (profile) => (profile.profileInfo ? profile.profileInfo : [])
);

export const selectProfileName = createSelector(
  [selectProfile],
  (profile) =>
    profile.profileInfo.displayName ? profile.profileInfo.displayName : []
);

export const selectReceiverInfo = createSelector(
  [selectProfile],
  (profile) =>  profile.receiverInfo ? profile.receiverInfo : []
);
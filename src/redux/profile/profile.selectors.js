import { createSelector } from "reselect";

const selectProfileImage = (state) => state.profile;

export const selectCurrentImage = createSelector(
  [selectProfileImage],
  (profile) => (profile.profileImage ? profile.profileImage : [])
);

export const selectProfileInfo = createSelector(
  [selectProfileImage],
  (profile) => (profile.profileInfo ? profile.profileInfo : [])
);

export const selectProfileName = createSelector(
  [selectProfileImage],
  (profile) =>
    profile.profileInfo.displayName ? profile.profileInfo.displayName : []
);

export const selectReceiverInfo = createSelector(
  [selectProfileImage],
  (profile) =>  profile.recieverInfo ? profile.recieverInfo : []
);
import { createSelector } from 'reselect'


const selectProfileImage  = (state) => state.profile;


export const selectCurrentImage = createSelector(
 [selectProfileImage],
 (profile) => profile.profileImage? profile.profileImage : []

)

export const selectProfileInfo = createSelector(
    [selectProfileImage],
    (profile) => profile.profileInfo? profile.profileInfo : []
   
   )


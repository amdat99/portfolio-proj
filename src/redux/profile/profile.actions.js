
import profileActionTypes from './profile.types'

export const fetchProfileImagePending = (profileId) => ({
    type: profileActionTypes.FETCH_PROFILEIMAGE_PENDING,
    payload: profileId

})


export const uploadProfileImagePending = (profileData) => ({
    type: profileActionTypes.SEND_PROFILEIMAGE_PENDING,
    payload: profileData

})

export const fetchProfileInfoPending = () => ({
    type: profileActionTypes.FETCH_PROFILEINFO_PENDING

})
export const fetchProfileInfoSuccess = (profileInfo) => ({
    type: profileActionTypes.FETCH_PROFILEINFO_SUCCESS,
    payload: profileInfo
})


export const fetchProfileImageSuccess = (profileImageData) => ({
    type: profileActionTypes.FETCH_PROFILEIMAGE_SUCCESS,
    payload: profileImageData

})

export const fetchProfileImageFailed = (error) => ({
    type: profileActionTypes.FETCH_PROFILEIMAGE_FAILED,
    payload: error
})

export const nullifyProfileImage = () => ({
    type: profileActionTypes.NULLIFY_PROFILEIMAGE
})


export const changeStatus = (userData) => ({
    type: profileActionTypes.CHANGE_STATUS,
    payload: userData
})

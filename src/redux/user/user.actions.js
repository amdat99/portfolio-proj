import userActionTypes from './user.types'

// export const setCurrentUser = (user)=> ({
//     type: userActionTypes.SET_CURRENT_USER,
//     payload: user
// })

export const googleSignInPending = () => ({
    type: userActionTypes.GOOGLE_SIGNIN_PENDING
})

export const signInSuccess = (user) => ({
    type: userActionTypes.SIGNIN_SUCCESS,
    payload: user
})

export const signInFailure = (error) => ({
    type: userActionTypes.SIGNIN_FAILED,
    payload: error
})


export const emailSignInPending = ( emailAndPassword ) => ({
    type: userActionTypes.EMAIL_SIGNIN_PENDING,
    payload: emailAndPassword
})

export const signUpPending = signUpData => ({
    type: userActionTypes.SIGN_UP_START,
    payload: signUpData
  });
  
  export const signUpSuccess = ({ user, additionalData }) => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
  });
  
  export const signUpFailure = error => ({
    type: userActionTypes.SIGN_UP_FAILURE,
    payload: error
  });

export const checkUserSession = () => ({
    type: userActionTypes.CHECK_USER_SESSION
})

export const signOutPending = () => ({
    type: userActionTypes.SIGNOUT_PENDING

})

export const signOutSuccess = () => ({
    type: userActionTypes.SIGNOUT_SUCCESS
})

export const signOutFailure = () => ({
    type: userActionTypes.SIGNOUT_FAILED
})


export const getProfileId = (profileId) => ({
    type: userActionTypes.GET_PROFILE_ID,
    payload: profileId
})

export const sendDirectMessagePending = (messageData)=> ({
    type: userActionTypes.SEND_DIRECT_MESSAGE_PENDING,
    payload: messageData
})

export const sendDirectMessageFailed = (error) => ({
    type: userActionTypes.SEND_DIRECT_MESSAGE_FAILED,
    payload: error

})

export const getRecievedMessagePending = (profileId) => ({
    type: userActionTypes.GET_RECIEVED_MESSAGE_PENDING,
    payload: profileId
})

export const getRecievedMessageSuccess = (messageData) => ({
    type: userActionTypes.GET_RECIVED_MESSAGE_SUCCESS,
    payload: messageData
})

export const getSentMessagePending = (userId) => ({
    type: userActionTypes.GET_SENT_MESSAGE_PENDING,
    payload: userId
})

export const getSentMessageSuccess = (messageData) => ({
    type: userActionTypes.GET_SENT_MESSAGE_SUCCESS,
    payload: messageData
})


export const getMessageFailed = (error) => ({
    type: userActionTypes.GET_MESSAGE_FAILED,
    payload: error
})
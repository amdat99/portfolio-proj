import groupchatActionTypes from "./groupchat.types";

export const createGroupPending = (groupData) => ({
  type: groupchatActionTypes.CREATE_GROUP_PENDING,
  payload: groupData,
});

export const createGroupSuccess = (groupData) => ({
  type: groupchatActionTypes.CREATE_GROUP_SUCCESS,
  payload: groupData,
});

export const createGroupFailure = (error) => ({
  type: groupchatActionTypes.CREATE_GROUP_FAILURE,
  payload: error,
});

export const getGroupsPending = (userId) => ({
  type: groupchatActionTypes.GET_GROUPS_PENDING,
  payload: userId,
});
export const getGroupsSuccess = (groupData) => ({
  type: groupchatActionTypes.GET_GROUPS_SUCCESS,
  payload: groupData,
});

export const getGroupsFailed = (error) => ({
  type: groupchatActionTypes.GET_GROUPS_FAILED,
  payload: error,
});

export const setCurrentGroup = (groupId) => ({
  type: groupchatActionTypes.SET_CURRENT_GROUP,
  payload: groupId,
});

export const fetchGroupMessagesPending = (groupId) => ({
  type: groupchatActionTypes.FETCH_GMESSAGE_PENDING, 
  payload: groupId,
})

export const fetchGroupMessagesSuccess = (messageData) => ({
  type: groupchatActionTypes.FETCH_GMESSAGE_SUCCESS, 
  payload: messageData
})

export const fetchGroupMessagesFailure = (e) => ({
  type: groupchatActionTypes.FETCH_GMESSAGE_FAILED,
  payload: e
})

export const sendGroupMessagePending = (messageData) => ({
  type: groupchatActionTypes.SEND_GMESSAGE_PENDING, 
  payload: messageData
})

export const sendGroupMessageSuccess = (messageData) => ({
  type: groupchatActionTypes.SEND_GMESSAGE_SUCCESS,
  payload: messageData
})

export const sendGroupMessageFailure = (e) => ({
  type: groupchatActionTypes.SEND_GMESSAGE_FAILED,
  payload: e
})

export const fetchGroupDataPending = (groupid) => ({
  type: groupchatActionTypes.FETCH_GROUPDATA_PENDING,
  payload: groupid
})

export const fetchGroupDataSuccess = (groupData) => ({
  type: groupchatActionTypes.FETCH_GROUPDATA_SUCCESS,
  payload: groupData
})

export const fetchGroupDataFailure = (e) => ({
  type: groupchatActionTypes.FETCH_GMESSAGE_FAILED,
  payload: e
})
import groupchatActionTypes from "./groupchat.types";

export const createGroupPending = (groupData) => ({
  type: groupchatActionTypes.CREATE_GROUP_PENDING,
  payload: groupData,
});

export const  createGroupSuccess = (groupData) => ({
    type: groupchatActionTypes.CREATE_GROUP_SUCCESS,
    payload : groupData,
})

export const createGroupFailure = (error) => ({
    type: groupchatActionTypes.CREATE_GROUP_FAILURE,
    payload : error,
})
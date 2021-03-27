import headerActionTypes from "./header.types";

export const setHeaderRoute = (route) => ({
  type: headerActionTypes.CHECK_USER_LOCATION,
  payload: route,
});

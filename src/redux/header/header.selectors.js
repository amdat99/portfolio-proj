import { createSelector } from "reselect";

const selectRoute = (state) => state.header;

export const selectCurrentRoute = createSelector(
  [selectRoute],
  (header) => header.route
);

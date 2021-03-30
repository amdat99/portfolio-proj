import { createSelector } from "reselect";

const selectModal = (state) => state.modal;

export const selectToggledModal = createSelector(
  [selectModal],
  (modal) => modal.showModal
);

export const selectToggledChatModal = createSelector(
  [selectModal],
  (modal) => modal.showChatModal
);

export const selectMessageBox = createSelector(
  [selectModal],
  (modal) => modal.showMessageBox
);

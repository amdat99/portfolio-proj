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

export const selectVideoBox = createSelector(
  [selectModal],
  (modal) => modal.showVideoBox
);

export const selectSucBox = createSelector(
  [selectModal],
  (modal) => modal.successMessage
);

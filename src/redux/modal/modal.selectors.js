import { createSelector } from 'reselect'


const selectModal  = (state) => state.modal;


export const selectToggledModal = createSelector(
 [selectModal],
 (modal) => modal.showModal 

)
import modalActionTypes from './modal.types'



const INITIAL_STATE = {

    showModal: false,
 
    
}
const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case modalActionTypes.TOGGLE_MODAL:

       return {
            ...state,
        showModal: !state.showModal
        }
case modalActionTypes.OPEN_MODAL:
        return{
            ...state,
            showModal: true
        }
        default:
            return state;
    }
}

export default modalReducer
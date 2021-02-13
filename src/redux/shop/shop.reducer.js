
import shopActionTypes from './shop.types'


const INITIAL_STATE = {
    items: null,
    categoryItems: null,
    product: null,
    sellingItems: null,
    isPending: false,
    hasFailed: ''

}

 const shopReducer = (state= INITIAL_STATE, action) => {
    switch (action.type){
        case shopActionTypes.FETCH_ITEMS_PENDING:
        case shopActionTypes.FETCH_FILTEREDITEMS_PENDING:
        case shopActionTypes.FETCH_SELLINGITEMS_PENDING:
            return{
                ...state,
                isPending: true
            }
        case shopActionTypes.FETCH_ITEMS_SUCCESS:
            return{
                ...state,
                isPending: false,
                hasFailed:'',
                items: action.payload
            }
            case shopActionTypes.FETCH_CATEGORY_SUCCESS:
                return{
                    ...state,
                    isPending: false,
                    categoryItems: action.payload
                }
                case shopActionTypes.FETCH_PRODUCT_SUCCESS:
                return{
                    ...state,
                    isPending: false,
                  
                    product: action.payload
                }
                case shopActionTypes.FETCH_SELLINGITEMS_SUCCESS:
                    return{
                        ...state,
                        sellingItems: action.payload,
                        isPending: false
                    }
            case shopActionTypes.FETCH_ITEMS_FAILED:
            case shopActionTypes.FETCH_SELLINGITEMS_FAILED:
                return{
                ...state,
                isPending: false,
                hasFailed: action.payload
                }
        default:
            return state
    }
}

export default shopReducer;

import shopActionTypes from './shop.types'
// import {  collectionsSnapshotToMap, firestore } from '../../firebase/firebase';

export const fetchItemsPending =  () => ({
    type: shopActionTypes.FETCH_ITEMS_PENDING
 
})

export const fetchProductPending = (productId) =>({
    type: shopActionTypes.FETCH_PRODUCT_PENDING,
    payload: productId
})

export const fetchCategoryPending = (category)=> ({
    type: shopActionTypes.FETCH_CATEGORY_PENDING,
    payload: category
})

export const fetchSellingItemsPending = (userId) => ({
    type: shopActionTypes.FETCH_SELLINGITEMS_PENDING,
    payload: userId
})

export const fetchSellingItemsSuccess = (productData) => ({
    type: shopActionTypes.FETCH_SELLINGITEMS_SUCCESS,
    payload: productData
})


export const setSearchField = (event) => ({
		
    type: shopActionTypes.FETCH_FILTEREDITEMS_PENDING,
    payload: event

})

export const fetchProductSuccess = (productData) => ({
    type: shopActionTypes.FETCH_PRODUCT_SUCCESS,
    payload: productData
})


export const fetchItemsSuccess = (itemData) => ({
    type: shopActionTypes.FETCH_ITEMS_SUCCESS,
    payload: itemData
})

export const fetchCategorySuccess = (itemData) => ({
    type: shopActionTypes.FETCH_CATEGORY_SUCCESS,
    payload: itemData
})

export const fetchItemsFailed = (errorMessage) => ({
    type: shopActionTypes.FETCH_ITEMS_FAILED,
    payload: errorMessage
})


export const fetchSellingItemsFailed = (errorMessage) => ({
    type: shopActionTypes.FETCH_SELLINGITEMS_FAILED,
    payload: errorMessage
})
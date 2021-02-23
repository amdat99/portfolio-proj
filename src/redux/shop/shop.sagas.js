import { takeLatest, call, put, all }  from 'redux-saga/effects'
import { getItemsDoc ,getCategoryDoc, getProductDoc, getSearchFilteredDoc,getSellingItemsDoc} from '../../firebase/firebase'

import shopActionTypes from './shop.types';
import { fetchItemsSuccess, fetchItemsFailed, fetchCategorySuccess, fetchProductSuccess, fetchSellingItemsSuccess } from './shop.actions';

export function* fetchItemsAsync() {
  try{
    const itemData =  yield call (getItemsDoc,'items')  // passes in firestore collection name 
    yield put(fetchItemsSuccess(itemData))
}catch(error){
    yield put(fetchItemsFailed(error))

   }
}
export function* fetchCategoriesAsync({payload: category}) {
    try{
     const itemData =  yield call (getCategoryDoc,'items',category)  // passes in firestore collection name 
                                                                    // and passes in category name
yield put(fetchCategorySuccess(itemData))
 }catch(error){
     yield put(fetchItemsFailed(error))
 }
 }


export function* fetchProductAsync({ payload: productId}) {
    try {
        const productData = yield call(getProductDoc,'items',productId)
        yield put(fetchProductSuccess(productData))
    }catch(error){
        yield put(fetchItemsFailed(error))
    }
    }

    
export function* fetchFilteredItemsAsync({ payload: event}) {
    try {
        const itemData = yield call(getSearchFilteredDoc,'items',event)
        yield put(fetchItemsSuccess(itemData))
    }catch(error){
        yield put(fetchItemsFailed(error))
    }
    }


    export function* fetchSellingItemsAsync({ payload: profileId}) {
console.log('sdsd',{ payload: profileId});
        try {
            const productData = yield call(getSellingItemsDoc,profileId)
            yield put(fetchSellingItemsSuccess(productData))
        }catch(error){
            yield put(fetchItemsFailed(error))
        }
        }


export function* fetchItemsPending() {
    yield takeLatest(shopActionTypes.FETCH_ITEMS_PENDING, 
   fetchItemsAsync
    )
}

export function* fetchCategoryPending() {
    yield takeLatest(shopActionTypes.FETCH_CATEGORY_PENDING, 
        fetchCategoriesAsync
    )
}


export function* fetchProductPending(){
    yield takeLatest(shopActionTypes.FETCH_PRODUCT_PENDING, 
        fetchProductAsync)
}

export function* fetchFilteredItemsPending(){
    yield takeLatest(shopActionTypes.FETCH_FILTEREDITEMS_PENDING,
    fetchFilteredItemsAsync)
}

export function* fetchSellingItemsPending(){
    yield takeLatest(shopActionTypes.FETCH_SELLINGITEMS_PENDING, fetchSellingItemsAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchItemsPending),
        call(fetchCategoryPending),
        call(fetchProductPending),
        call(fetchFilteredItemsPending),
        call(fetchSellingItemsPending)

    ])

}
import { takeEvery, call, put, all }  from 'redux-saga/effects'
import { getItemsDoc ,getCategoryDoc, getProductDoc, getSearchFilteredDoc} from '../../firebase/firebase'

import shopActionTypes from './shop.types';
import { fetchItemsSuccess, fetchItemsFailed, fetchCategorySuccess, fetchProductSuccess } from './shop.actions';

export function* fetchItemsAsync() {
  try{
    const itemData =  yield call (getItemsDoc,'items')  // passes in firestore collection name 
    yield put(fetchItemsSuccess(itemData))
}catch(error){
    yield put(fetchItemsFailed(error.message))

   }
}
export function* fetchCategoriesAsync({payload: category}) {
    try{
     const itemData =  yield call (getCategoryDoc,'items',category)  // passes in firestore collection name 
                                                                    // and passes in category name
yield put(fetchCategorySuccess(itemData))
 }catch(error){
     yield put(fetchItemsFailed(error.message))
 }
 }


export function* fetchProductAsync({ payload: productId}) {
    try {
        const productData = yield call(getProductDoc,'items',productId)
        yield put(fetchProductSuccess(productData))
    }catch(error){
        yield put(fetchItemsFailed(error.message))
    }
    }

    
export function* fetchFilteredItemsAsync({ payload: event}) {
    try {
        const itemData = yield call(getSearchFilteredDoc,'items',event)
        yield put(fetchItemsSuccess(itemData))
    }catch(error){
        yield put(fetchItemsFailed(error.message))
    }
    }


export function* fetchItemsPending() {
    yield takeEvery(shopActionTypes.FETCH_ITEMS_PENDING, 
   fetchItemsAsync
    )
}

export function* fetchCategoryPending() {
    yield takeEvery(shopActionTypes.FETCH_CATEGORY_PENDING, 
        fetchCategoriesAsync
    )
}


export function* fetchProductPending(){
    yield takeEvery(shopActionTypes.FETCH_PRODUCT_PENDING, 
        fetchProductAsync)
}

export function* fetchFilteredItemsPending(){
    yield takeEvery(shopActionTypes.FETCH_FILTEREDITEMS_PENDING,
    fetchFilteredItemsAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchItemsPending),
        call(fetchCategoryPending),
        call(fetchProductPending),
        call(fetchFilteredItemsPending)

    ])

}
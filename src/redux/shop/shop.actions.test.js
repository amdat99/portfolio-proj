import shopActionTypes from './shop.types';
import {
fetchItemsPending,
 fetchItemsSuccess,
 fetchItemsFailed,
 fetchProductPending,
 fetchProductSuccess,
 fetchCategoryPending,
 fetchCategorySuccess,
 fetchSellingItemsPending,
 fetchSellingItemsSuccess


} from './shop.actions';



describe('fetchItems sucess action', () => {
  it('expect action to be run and have mock payload', () => {
      const mockData ={name: 'ball'}
        const action = fetchItemsSuccess(mockData);
    expect(action.type).toEqual(shopActionTypes.FETCH_ITEMS_SUCCESS);
    expect(action.payload).toEqual(mockData);
  });
});

describe('fetchItemsPending action', () => {
    it('expect action to be run', () => {
      expect(fetchItemsPending().type).toEqual(shopActionTypes.FETCH_ITEMS_PENDING);
    });
  });

  
describe('fetchItems error action', () => {
    it('expect action to be run and have mock payload', () => {
        const mockData ='error'
          const action = fetchItemsFailed(mockData);
      expect(action.type).toEqual(shopActionTypes.FETCH_ITEMS_FAILED);
      expect(action.payload).toEqual(mockData);
    });
  });

  
describe('fetchProduct success action', () => {
    it('expect action to be run and have mock payload', () => {
       const mockData ={name: 'ball'}
          const action = fetchProductSuccess(mockData);
      expect(action.type).toEqual(shopActionTypes.FETCH_PRODUCT_SUCCESS);
      expect(action.payload).toEqual(mockData);
    });
  });

  
describe('fetchItems sucess action', () => {
    it('expect action to be run and have mock payload', () => {
       const mockData ={name: 'ball'}
          const action = fetchProductPending(mockData);
      expect(action.type).toEqual(shopActionTypes.FETCH_PRODUCT_PENDING);
      expect(action.payload).toEqual(mockData);
    });
  });
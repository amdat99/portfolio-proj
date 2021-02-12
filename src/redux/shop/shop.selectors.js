import { createSelector } from 'reselect'


const selectShop  = (state) => state.shop;


export const selectErrorMessage = createSelector(
 [selectShop],
 (shop) => shop.hasFailed

)

export const selectAddItems = createSelector(
    [selectShop],
    (shop) => shop.addItems
   )

   export const selectItems = createSelector(
    [selectShop],
    (shop) => shop.items? shop.items
    : []
    
)

export const selectProduct = createSelector(
  [selectShop],
  (shop) => shop.product? shop.product
  : []
  
)

export const selectCategory = createSelector(
  [selectShop],
  (shop) => shop.categoryItems? shop.categoryItems
  : []
  
)
export const isItemDataLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.items

  )
  export const isProductDataLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.product
)
export const isCategoryDataLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.categoryItems
)
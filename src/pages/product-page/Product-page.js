import React from 'react';

import ShopHeader from '../../components/shop-header/Shop-header'
import ProductItem from '../../components/product-item/Product-item'


import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux'

import { selectProduct, isProductDataLoaded } from '../../redux/shop/shop.selectors'

function ProductPage({isLoaded,product}) {

    return (
        <div className="product-page-container">
        <ShopHeader />

        {  isLoaded
        ?product.map(item =>
         <ProductItem item={item} key={item.productId} /> )
        
        : <h1>LOADING...</h1>
        } 
        
        
        </div>
    );
}

const mapStateToProps = (createStructuredSelector)({
    product: selectProduct,
    isLoaded: isProductDataLoaded
})

 export default connect(mapStateToProps)(ProductPage);
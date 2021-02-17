import React,{Suspense} from 'react';

import ShopHeader from '../../components/shop-header/Shop-header'
// import ProductItem from '../../components/product-item/Product-item'


import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux'

import { selectProduct, isProductDataLoaded } from '../../redux/shop/shop.selectors'

const ProductItem = React.lazy(() => import('../../components/product-item/Product-item'))

function ProductPage({isLoaded,product}) {

    return (
        <div className="product-page-container">
        
        <ShopHeader />
        <Suspense fallback ={<div className="loader"></div>}>
        {  isLoaded
        ?product.map(item =>
         <ProductItem item={item} key={item.name} /> )
        
        : <h1>LOADING...</h1>
        } 
        
        </Suspense>
        </div>
    );
}

const mapStateToProps = (createStructuredSelector)({
    product: selectProduct,
    isLoaded: isProductDataLoaded
})

 export default connect(mapStateToProps)(ProductPage);
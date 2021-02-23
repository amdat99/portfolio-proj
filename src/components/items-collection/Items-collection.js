import React from 'react';
import { withRouter } from 'react-router-dom'
import { fetchProductPending } from '../../redux/shop/shop.actions'
import { addItem } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux'

import { LazyLoadImage  } from 'react-lazy-load-image-component';

import './Items-collection.scss'

function ItemsCollection({item,incrementItem,fetchProductPending,history, scrollPosition }) {
const {name,price,picture,profileId, soldBy} = item;
console.log(item)
    return (
      <div id='item-container' >
         <div id='item-overlay' >
         <LazyLoadImage id ='item-image' src ={`${picture}?size=220x200`} alt={'item'} height={'220'} width={'200'}
        scrollPosition={scrollPosition} effect="blur"
         onClick={() => { fetchProductPending(profileId); 
         history.push('/product') } }/>
           
           
           <span id='item-soldBy'>Sold By: {soldBy}</span>
            <span id='item-name'>{name}</span>
            <span id='item-price'>£{price}</span>
            <button onClick={() => 
                    incrementItem(item)} >
                   ADD TO CART    
            </button>
            </div>  
   
        </div>    

    );
}

const mapDispatchToProps = (dispatch) => ({
  incrementItem: item => dispatch(addItem(item)),
  fetchProductPending: (productId) => dispatch(fetchProductPending(productId)),
 
}) 



export default withRouter(connect(null,mapDispatchToProps)(ItemsCollection));

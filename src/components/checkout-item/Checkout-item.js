import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import {clearItemFromCart, addItem, minusItem} from '../../redux/cart/cart.actions'
import { fetchProductPending } from '../../redux/shop/shop.actions'

import './Checkout-item.scss';

const CheckoutItem = ( {cartItem, clearItem, decrementItem,incrementItem,fetchProductPending, history} ) => {
    const {name,quantity,price, picture} = cartItem

 
return (


  
  <div className='checkout-item'>
    <div className='checkout-item-image-container'>
      <img className='checkout-item-img' src={`${picture}size=180x150`} alt='item' 
        //  onClick={() => { fetchProductPending(productId); 
        //  history.push('/product') } }
      />
    </div>
          <div className='checkout-item-labels'>
        <span className='checkout-item-name'>{name}</span>
        <span className='checkout-item-name'>£{price}</span>
      
        <div className='checkout-item-arrow' onClick={ () => decrementItem(cartItem)}>&#10094;</div>   
            <span className='checkout-item-value'>{quantity}</span>
        <div className='checkout-item-arrow' onClick={() => incrementItem(cartItem)}>&#10095; </div>
       </div>    
      
    <div className='checkout-item-remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
  </div>

   
) }

const mapDispatchToProps = (dispatch) => ({
    clearItem: (item) => dispatch(clearItemFromCart(item)),
    decrementItem: (item) => dispatch(minusItem(item)),
    incrementItem: (item) => dispatch(addItem(item)),
    fetchProductPending: (productId) => dispatch(fetchProductPending(productId))
})

export default withRouter(connect(null,mapDispatchToProps)(CheckoutItem));
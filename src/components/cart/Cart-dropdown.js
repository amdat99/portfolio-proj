import React from 'react'

// import CustomButton from '../custom-button/CustomButton'
import { withRouter, Link } from 'react-router-dom'
// import ScrollToBottom from 'react-scroll-to-bottom';

import { connect } from 'react-redux';
import { selectCartItems} from '../../redux/cart/cart.selectors'
import {toggleCartHidden,clearAllItemsFromCart}  from '../../redux/cart/cart.actions'
import { fetchProductPending } from '../../redux/shop/shop.actions'
import {minusItem, addItem} from '../../redux/cart/cart.actions'
import CartItem from './Cart-item'


import './Cart.scss'
function CartDropdown({cartItems, toggleCartHidden,clearCart, history, incrementItem, decrementItem,fetchProductPending}) {
    

     
        return (
        <div className = 'cart-dropdown hide-scroll' onBlur ={toggleCartHidden} tabIndex={'0'}  > 
       
            <div className = 'dropdown-clear-cart'onClick = { clearCart }> CLEAR CART &#9746; 
            </div>

            <div className = ' hide-scroll cart-items'  >  
            {   
                cartItems.length ?
                cartItems.map((cartItem,i) => {
                return <CartItem  key ={i} item = {cartItem} incrementItem={incrementItem} decrementItem={decrementItem} fetchProductPending= {fetchProductPending}/>
                } )
                : <span className = 'empty-message'>Your cart is empty</span>
            }  

            </div>
             
            <button className= 'cart-checkout-button' onClick = {() =>{
                 history.push('/checkout');
                 toggleCartHidden()}}> CHECKOUT 
            </button>  
          
            
           
            
        </div>
    );
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
    
  });

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()),
    clearCart: items => dispatch(clearAllItemsFromCart(items)),
    decrementItem: item => dispatch(minusItem(item)),
    incrementItem: item => dispatch(addItem(item)),
    fetchProductPending: (productId) => dispatch(fetchProductPending(productId))
})


//   const mapStateToProps = ({ cart: { cartItems } }) => ({
//     cartItems
//   });
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CartDropdown));


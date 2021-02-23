import React from 'react'


import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { selectCartItems} from '../../redux/cart/cart.selectors'
import {toggleCartHidden,clearAllItemsFromCart}  from '../../redux/cart/cart.actions'
import { fetchProductPending } from '../../redux/shop/shop.actions'
import {minusItem, addItem} from '../../redux/cart/cart.actions'
import CartContent from './Cart-item'


import './Cart.scss'
 export function CartDropdown({cartItems, toggleCartHidden,clearCart, history, incrementItem, decrementItem,fetchProductPending}) {
    

     
        return (
        <div className = 'cart-dropdown hide-scroll' onBlur ={toggleCartHidden} tabIndex={'0'}  > 
       
            <div className = 'dropdown-clear-cart' onClick = { clearCart }> CLEAR CART &#9746; 
            </div>

            <div className = ' hide-scroll cart-items'  >  
            {   
                cartItems.length ?
                cartItems.map((cartItem,i) => {
                return <CartContent  key ={i} item = {cartItem} incrementItem={incrementItem} decrementItem={decrementItem} fetchProductPending= {fetchProductPending}/>
                } )
                : <span className = 'empty-message'>Your cart is empty</span>
            }  

            </div>
            <Link to ='/checkout'>
            <button className= 'cart-checkout-button'  onClick ={toggleCartHidden}
            > 
            CHECKOUT 
            </button>  
         </Link>
            
    
            
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


export default connect(mapStateToProps,mapDispatchToProps)(CartDropdown);


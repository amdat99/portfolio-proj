import React,{ useState, useEffect} from 'react';
import CheckoutItem from '../../components/checkout-item/Checkout-item'
import ShopHeader from '../../components/shop-header/Shop-header'
import StripeButton from '../../components/stripe-button/Stripe-button'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors'
import { setHeaderRoute } from '../../redux/header/header.actions'

import './Checkout-page.scss'

function CheckoutPage({cartItems,total,currentUser,setHeaderRoute}) {

    const [route] = useState('store')
    
    useEffect(()=>{
        setHeaderRoute(route)
     // eslint-disable-next-line   
    },[setHeaderRoute])

    return (
        <div className='checkout-page'>
        <ShopHeader />
            <div className= 'checkout-header'>
    
            </div>
                {cartItems.map(cartItem => 
                <CheckoutItem cartItem = {cartItem} key= {cartItem.productId} / >
                )}
                <div className= 'checkout-test-checkout'>
            <div >
                <span>Total: £{total}</span>
            </div>  {currentUser ?
              <div > 
                  <StripeButton price = {total} cartItems = {cartItems} />
              </div>:
              <Link className ='checkout-signin'  to='/signon'>please signin to make a purchase</Link>  }
            
                *To test please use the following card details to pay:<br/>
                4242 4242 4242 4242 - Exp: 01/22 - CVV: 123 <br/>
                *Test user: email: john@gmail.com password: 123123 
           </div>
            </div>
    );
}

const mapStateToProps = (createStructuredSelector) ({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
    setHeaderRoute: (route) => dispatch(setHeaderRoute(route)),
})
export default connect(mapStateToProps,mapDispatchToProps)(CheckoutPage);
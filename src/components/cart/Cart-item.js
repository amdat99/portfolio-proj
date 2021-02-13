import React from 'react'

import './Cart-item.scss'
import { withRouter } from 'react-router-dom'
import { fetchProductPending } from '../../redux/shop/shop.actions'
import {connect} from 'react-redux'
import {minusItem, addItem} from '../../redux/cart/cart.actions'



function CartContent({item, decrementItem,incrementItem,fetchProductPending,history}) {

    console.log(item)

    const { name, price, picture, quantity, profileId} = item;
    return(
        <div className = 'cart-item'>
            <img src={picture} alt = 'item' width='80' style={{cursor: 'pointer'}}
        onClick={() => { fetchProductPending(profileId); 
         history.push('/product') }}
            />
         
           <div className = 'cartitem-details'>
                <span className= 'cartitem-name'>{name}</span>
                <div className= 'cartitem-name'>{quantity}x£{price}</div>
                <div className= 'cartitem-remove'> 
                    <span  className = 'cartitem-remove-span'onClick ={() => decrementItem(item) } >remove </span>
                    <span className= 'cartitem-remove-span'onClick ={() => incrementItem(item) } >add</span>
                </div>  
            </div> 
        </div>
    );
}
const mapDispatchToProps = (dispatch) => ({
    decrementItem: item => dispatch(minusItem(item)),
    incrementItem: item => dispatch(addItem(item)),
    fetchProductPending: (productId) => dispatch(fetchProductPending(productId))
})

export default withRouter(connect(null,mapDispatchToProps)(CartContent));
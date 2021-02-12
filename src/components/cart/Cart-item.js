import React from 'react'

import './Cart-item.scss'

import {connect} from 'react-redux'
import {minusItem, addItem} from '../../redux/cart/cart.actions'



function CartContent({item, decrementItem,incrementItem}) {

    const { name, price, picture, quantity} = item;
    return(
        <div className = 'cart-item'>
            <img src={picture} alt = 'item' width='80'/>
         
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
})

export default connect(null,mapDispatchToProps)(CartContent);
import React from 'react';
import { connect } from 'react-redux';

import {toggleCartHidden}  from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import { createStructuredSelector} from 'reselect'


import './Cart.scss'

export function CartButton({toggleCartHidden, itemCount}) {
    return (
        <div className = 'cart-button-container'   onClick={toggleCartHidden} 
        >   
            <span> CART </span>
            <span className = 'cart-button-icon'>💰</span>
           
            <span className = 'cart-button-count'>{itemCount}</span>
            
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()),
})

const mapStateToProps = (createStructuredSelector)  ({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartButton) 
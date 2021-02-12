import React from 'react';
import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux'
import {addItem} from '../../redux/cart/cart.actions'
import {toggleCartHidden}  from '../../redux/cart/cart.actions'
import { fetchProductPending } from '../../redux/shop/shop.actions'
import './Item-preview.scss'

function ItemPreview({item,fetchProductPending,history}) {
const {name,price,picture,productId} = item;

    return (
     
         <div id='item-preview-container' >

         {/* <Link to='/productpage'> */}
         <div id='item-preview-overlay' >
         <img id ='item-image' src ={picture} alt='item' width='100' height='100'
         onClick={() => { fetchProductPending(productId); 
         history.push('/product') } }/>
           
            <span id='item-preview-name'>{name}</span>
            <span id='item-preview-price'>£{price}</span>
            </div>  
            {/* </Link> */}
           </div>    

    );
}

const mapDispatchToProps = (dispatch) => ({
    fetchProductPending: (productId) => dispatch(fetchProductPending(productId)),
})

export default withRouter(connect(null,mapDispatchToProps)(ItemPreview));

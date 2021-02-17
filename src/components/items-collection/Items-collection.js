import React from 'react';
import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux'
import {addItem} from '../../redux/cart/cart.actions'
import { fetchProductPending } from '../../redux/shop/shop.actions'
import './Items-collection.scss'

function ItemsCollection({item,incrementItem,fetchProductPending,history}) {
const {name,price,picture,profileId, soldBy} = item;

    return (
      <div id='item-container' >
         <div id='item-overlay' >
         <img id ='item-image' src ={picture} alt='item' height='210' width='180'
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

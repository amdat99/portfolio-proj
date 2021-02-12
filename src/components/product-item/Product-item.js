import React from 'react';
import {connect} from 'react-redux'
import {addItem} from '../../redux/cart/cart.actions'

import './Product-item.scss'

function ProductItem({item, incrementItem}) {
    const {name,price,picture,description,soldBy} = item;

   const lorem = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
    
   return (
        <div id='product-item-container' >

   
        <h2 id='product-item-name'>{name.toUpperCase()}</h2> 
       
        
        <img id ='product-item-image' src ={picture} alt='item' />
       
        <div id='product-item-overlay' >
       
          
          <div id='product-item-labels'>
         
        <span>{description}{lorem}</span> 
        <h2 id='product-item-price'>£{price}</h2> 
          <span  id='product-item-seller'>seller: {soldBy}</span>
           <button onClick={() => incrementItem(item)} 
           style={{position: 'relative',right: '40px'}}>
                   Add to cart    
           </button>
           </div>
           </div>  
          
          </div> 
    );
}
const mapDispatchToProps = (dispatch) => ({
    incrementItem: item => dispatch(addItem(item)),
})

export default connect(null,mapDispatchToProps)(ProductItem);
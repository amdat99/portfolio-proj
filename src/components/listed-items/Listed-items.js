import React, {useState} from 'react'


import { withRouter } from 'react-router-dom'


import { deleteListing} from '../../firebase/firebase'

import './Listed-items.scss'
function ListedItems({sellingItem, history,fetchProductPending}) {
    const [delistDropdown, setDelistDropdown,] = useState(false)
    
    const { name, price, picture,productId,userId } = sellingItem;
     
    const toggleDropdown = () => {
        setDelistDropdown(!delistDropdown)
    }

    const delistItem = () => {
        deleteListing(userId,productId)
    }
        return (
        <div  className="listed-items-container"  > 
      
       
             
       <img src={picture} alt = 'item' width='60' height='75'  style={{cursor:'pointer'}}
        onClick={() => { fetchProductPending(productId); 
         history.push('/product') } }
         />
         
         <div className = 'cartitem-details'>
              <span >{name}</span>
              <div >£{price}</div>
            
            <div className= 'listed-item-toggle'onMouseEnter ={toggleDropdown} onMouseLeave ={toggleDropdown}>
            Delist Item
            
            { delistDropdown?
            <button type="button" onClick={delistItem} >X</button>
            : null }
           </div>
            </div>
        </div>
    );
}



    
export default withRouter(React.memo(ListedItems));
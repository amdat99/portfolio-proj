import React ,{useEffect,useState} from 'react';
   

import StorePageDirectory from '../../components/store-page-directory/Store-page-directory'
import SharedHeader from '../../components/shared-header/Shared-header'


import { setHeaderRoute } from '../../redux/header/header.actions'

import { connect } from 'react-redux'

function StorePage({setHeaderRoute,match}) {
 
  
    const [route] = useState('store')
    
    useEffect(()=>{
        setHeaderRoute(route)
     // eslint-disable-next-line   
    },[setHeaderRoute])

    return (
    <div>
    
    <SharedHeader  />
     <h1>Store</h1>
    <StorePageDirectory />


    </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setHeaderRoute: (route) => dispatch(setHeaderRoute(route)),

})


export default connect(null, mapDispatchToProps)(StorePage) 
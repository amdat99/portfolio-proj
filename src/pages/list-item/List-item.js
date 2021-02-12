import React ,{useEffect,useState} from 'react';


import SharedHeader from '../../components/shared-header/Shared-header'
import AddItems from '../../components/add-items/Add-items'

import { setHeaderRoute } from '../../redux/header/header.actions'
import { connect } from 'react-redux'

function AddItem({setHeaderRoute}) {

    const [route] = useState('store')
    
    useEffect(()=>{
        setHeaderRoute(route)
     // eslint-disable-next-line   
    },[setHeaderRoute])


    return (
        <div>
        <SharedHeader />
        <AddItems />
        
     

        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setHeaderRoute: (route) => dispatch(setHeaderRoute(route))
})


export default connect(null, mapDispatchToProps)(AddItem) 
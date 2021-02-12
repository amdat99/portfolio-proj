

import React from 'react';

import ShopHeader from '../shop-header/Shop-header'
import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux'
import { selectCurrentRoute } from '../../redux/header/header.selectors';

function SharedHeader({route}) {
    return (
        <div>
        { route = 'shop'
        ?<ShopHeader  />
        :null

        }
            
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    route: selectCurrentRoute
  })
  
  export default connect(mapStateToProps)(SharedHeader);
  
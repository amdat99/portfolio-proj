import React from 'react';
import {Link} from 'react-router-dom'

// import {ReactComponent as Logo } from '../../assets/logo.png'
import ProfileIcon from '../profile-icon/Profile-icon'
import './Navigation-shared.scss'

function NavigationShared() {
    return (
    <div className="nav-shared-container">
        
        <div className="nav-shared-logo">
        <Link to='/'>
         <img src='https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_960_720.png' height='30' width='30' alt='logo' />
         Tada
        </Link>
        <div className="nav-shared-profileicon">
        <ProfileIcon  />
        </div>
        </div>
    
    </div>
    );
}

export default NavigationShared;
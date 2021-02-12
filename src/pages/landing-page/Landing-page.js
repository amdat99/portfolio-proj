import React from 'react';
import { Link } from 'react-router-dom';


import './Landing-page.scss'

function LandingPage(props) {
    
    const shop = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib'
    const chat = 'https://images.unsplash.com/photo-1606669059257-19fc4ca49f79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib'
    
    return (
    <div className="Landing-page-container">
   
    <div className="landing-page-box"> 
    <Link to='/store' >
        <h1 className = 'landing-page-title'>Enter The Store</h1></Link>
    <div className="landing-page-links"
        style={{ backgroundImage: `url(${shop})`}}>
    </div> 
    </div>    
    
   
   <Link to='/chatapp'>
    <div className="landing-page-box">
        <h1 className= 'landing-page-title'>Enter the Chatapp</h1>
    <div className="landing-page-links" 
     style={{ backgroundImage: `url(${chat})`}}>
     </div></div>
    </Link>   
    </div>
    );
}

export default LandingPage;
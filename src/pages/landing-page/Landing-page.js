import React from 'react';
import { Link } from 'react-router-dom';

import './Landing-page.scss'

function LandingPage(props) {
     
  const shop = 'https://cdn.pixabay.com/photo/2017/06/21/20/51/tshirt-2428521_960_720.jpg'
  const chat = 'https://firebasestorage.googleapis.com/v0/b/tada-proj.appspot.com/o/images%2Fprofile1.041490457294241?alt=media&token=ad802569-4766-419e-87ad-6ef6aa65b685'
   
  return (
    <div > 
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
    </div>
    );
}

export default LandingPage;
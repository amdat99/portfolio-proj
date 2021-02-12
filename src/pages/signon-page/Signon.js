import React ,{useEffect} from 'react';
import SignIn from '../../components/signin&signup/Signin';
import SignUp from '../../components/signin&signup/Signup';


import { setHeaderRoute } from '../../redux/header/header.actions'
import { connect } from 'react-redux'


import './Signon.scss';

function SignOn({setHeaderRoute}) {

    useEffect(()=>{
        setHeaderRoute(null)
    },[setHeaderRoute])

    return (
        <div className="signon-container">
             <SignIn />
            <SignUp />
            
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setHeaderRoute: () => dispatch(setHeaderRoute())
})
export default connect(null,mapDispatchToProps)(SignOn)
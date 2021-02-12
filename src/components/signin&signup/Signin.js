import React, { useState} from 'react';
import { googleSignInPending, emailSignInPending } from '../../redux/user/user.actions'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectErrorMessage, selectCurrentUser} from '../../redux/user/user.selectors';

import './signin-and-signup.scss'



function SignIn({googleSignInPending, emailSignInPending, error ,currentUser}) {

    const [signInInfo, setSignInInfo] = useState({email: '', password: ''})

    const { email, password } = signInInfo
    const  handleSubmit = async event => {
         event.preventDefault();
         emailSignInPending(email,password)
        if(error !== null){
            alert(error)
        }
    
        };

    const handleChange = (event) => {
    const {value, name} = event.target;
    
    setSignInInfo({ ...signInInfo,[name]:value})
}


    return (
        <div className="sign-in">
                
                
                <form  className='sign-on-container' onSubmit = {handleSubmit}>
                    
                    <h1> Sign in</h1>
                    <input name="email" type="email" value={email} placeholder = 'Enter your email'
                     onChange={handleChange} label='email' className='sign-on-input' required/>
                   
                    <input name="password" type="password" value={password} placeholder = 'Enter your password'
                     onChange={handleChange} label ='password' className='sign-on-input' required/> 
                    <div className="button">
                    <button  type="submit" > Sign In </button>
                    <button type ='button' onClick ={googleSignInPending} id= 'sign-on-google'  > Sign In With Google </button>
                    </div>

                </form>
                
            </div>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInPending: () => dispatch(googleSignInPending()),
    emailSignInPending: (email, password) =>dispatch(emailSignInPending({ email, password })),
  
  });

  const mapStateToProps = createStructuredSelector({
    error: selectErrorMessage,
    currentUser: selectCurrentUser
 })
  
  export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
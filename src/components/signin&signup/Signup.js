import React from 'react';
// import FormInput from '../formInput/FormInput';
// import CustomButton from '../custom-button/CustomButton';
import { connect } from 'react-redux'
// import { auth , createUserProfileDoc } from '../../firebase/firebase'
import { createStructuredSelector } from 'reselect'
import { signUpPending } from '../../redux/user/user.actions'
import { selectErrorMessage } from '../../redux/user/user.selectors'

import './signin-and-signup.scss'

class SignUp extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }

     handleSubmit = async (event) => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state
        const { signUpPending, error } = this.props

        if(password !== confirmPassword && password.length && confirmPassword.length < 6){
            alert("passwords error, make sure you password has 6 characters")
        return;
        } 
    //     try {
    //         const { user } = await auth.createUserWithEmailAndPassword(email, password)
    //        await createUserProfileDoc(user,{displayName})
    //        this.setState=({
    //         displayName: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: ''})
    //     } catch (error){
    //         console.log(error)
    //     }
    signUpPending({ displayName, email, password });
    if(error!== null){
      alert(error.message)
    }
};

handleChange = event => {
  const { name, value } = event.target;

  this.setState({ [name]: value });
};

render() {
  const { displayName, email, password, confirmPassword } = this.state;
  return (
    <div>
   
  
      <form className='sign-on-container' onSubmit={this.handleSubmit}>  
       <h1>Register</h1>
 
        <input className='sign-on-input'
          type='text' name='displayName' placeholder='enter a username:'
          value={displayName}onChange={this.handleChange}abel='Display Name'required/>
        
        <input className='sign-on-input'
          type='email' name='email' placeholder='enter a valid email'
          value={email} onChange={this.handleChange} label='Email' required/>
        
        <input className='sign-on-input'
          type='password' name='password' placeholder ='enter your password'
          value={password} onChange={this.handleChange}label='Password'
          required
        />
        <input className='sign-on-input'
          type='password' name='confirmPassword' placeholder = 'reenter your password '
          value={confirmPassword}onChange={this.handleChange} label='Confirm Password' required
        />
     
        <button  type='submit'>SIGN UP</button>
      </form>
    </div>
  );
}
}

const mapDispatchToProps = dispatch => ({
    signUpPending: signUpData => dispatch(signUpPending(signUpData))
});

const mapStateToProps = createStructuredSelector({
  error: selectErrorMessage,
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
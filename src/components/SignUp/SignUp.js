import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'
import img from '../Login/google.jpg'
import { useState } from 'react';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SignUp = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[error,setError] = useState('');
    const [createUserWithEmailAndPassword,user] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
    const navigate = useNavigate();


    const handleEmail=e=>{
        setEmail(e.target.value);
    }
    const handlePassword=e=>{
        setPassword(e.target.value);
    }
    const handleConfirmPassword=e=>{
        setConfirmPassword(e.target.value);
    }
    if(user||user1){
        navigate('/shop')
    }
    const handleSignUp=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            setError("Passwords did not match")
            return;
        }
        if(password.length<6){
            setError("Password must be 6 characters or longer")
            return;
        }

        createUserWithEmailAndPassword(email,password);
    }


    return (
        <div className='login'>
        <form onSubmit={handleSignUp} >
            <div className="form-container">
                <h2 className='form-title'>Sign Up</h2>
                <div className="input-grp">
                    <label htmlFor="email">Email</label> <br />
                    <input onBlur={handleEmail} type="email" name="email" id="" required />
                </div>
                <div className="input-grp">
                    <label htmlFor="password">Password</label> <br />
                    <input onBlur={handlePassword} type="password" name="password" id="" required />
                </div>
                <div className="input-grp">
                    <label htmlFor="confirm-password">Confirm Password</label> <br />
                    <input onBlur={handleConfirmPassword} type="password" name="confirm-password" id="" required />
                </div>
                <p style={{color:'red'}} >{error||error1?.message}</p>
                <input className='submit' type="submit" value="Sign Up" />
                <p className='login-text'>Already have an account? <Link to="/login">Login</Link> </p>
                <div className='divider'>
                      <hr/>
                      <p>or</p>
                      <hr/> 
                </div>
                <button onClick={()=>signInWithGoogle()} className='google-login'> <img src={img} alt="" /> Continue with Google</button>
            </div>
        </form>
        </div>
    );
};

export default SignUp;
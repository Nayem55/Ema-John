import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import img from './google.jpg'
import './Login.css'

const Login = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();

    const handleEmail=e=>{
        setEmail(e.target.value);
    }
    const handlePassword=e=>{
        setPassword(e.target.value);
    }
    if(user){
        navigate('/shop')
    }
   

    const handleLogin=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(email,password)
    }
    return (
        <div className='login'>
        <form onSubmit={handleLogin} >
            <div className="form-container">
                <h2 className='form-title'>Login</h2>
                <div className="input-grp">
                    <label htmlFor="email">Email</label> <br />
                    <input onBlur={handleEmail} type="email" name="email" id="" required />
                </div>
                <div className="input-grp">
                    <label htmlFor="password">Password</label> <br />
                    <input onBlur={handlePassword} type="password" name="password" id="" required />
                </div>
                <p style={{color:'red'}}>{error?.message}</p>
                <p style={{color:'green'}}>{loading && "Signing in..."}</p>
                <input className='submit' type="submit" value="Login" />
                <p className='login-text'>New to Ema-john? <Link to="/signup">Create New Account</Link> </p>
                <div className='divider'>
                      <hr/>
                      <p>or</p>
                      <hr/> 
                </div>
                <button className='google-login'> <img src={img} alt="" /> Continue with Google</button>
            </div>
        </form>
        </div>
    );
};

export default Login;
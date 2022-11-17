import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Shipment = () => {
    const [user] = useAuthState(auth);
    const[name,setname] = useState('');
    const[address,setAddress] = useState('');
    const[phone,setPhone] = useState('');
    const navigate = useNavigate();

    const handleName=e=>{
        setname(e.target.value);
    }

    const handleAddress=e=>{
        setAddress(e.target.value);
    }
    const handlePhone=e=>{
        setPhone(e.target.value);
    }
    const handleSubmit=e=>{
        e.preventDefault();
        const shipping = {name,address,phone};
        console.log(shipping);
    }
    return (
        <div className='login'>
            <form onSubmit={handleSubmit} >
            <div className="form-container">
                <h2 className='form-title'>Shipping Information</h2>
                <div className="input-grp">
                    <label htmlFor="name">Your Name</label> <br />
                    <input className='ps-3' onBlur={handleName} type="text" name="name" id="" required />
                </div>
                <div className="input-grp">
                    <label htmlFor="email">Your Email</label> <br />
                    <input className='ps-3' value={user?.email} readOnly type="email" name="email" id="" required />
                </div>
                <div className="input-grp">
                    <label htmlFor="address">Your Address</label> <br />
                    <input className='ps-3' onBlur={handleAddress} type="text" name="address" id="" required />
                </div>
                <div className="input-grp">
                    <label htmlFor="phone">Phone Number</label> <br />
                    <input className='ps-3' onBlur={handlePhone} type="text" name="phone" id="" required />
                </div>
                <button className="submit shipment" onClick={()=>navigate('/purchase')} >
                  Purchase Order
                  <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </button>
            </div>
        </form>
        </div>
    );
};

export default Shipment;
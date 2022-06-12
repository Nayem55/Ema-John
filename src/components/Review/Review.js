import React from 'react';
import './Review.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";



const Review = ({product , removeItem}) => {
    const {name,price,quantity} = product

    return (
        <div className='d-flex review-order'>
            <img className='img-fluid order-img' src={product.img} alt="" />
            <div className="order-details">
                <div>
                    <h5 className='pe-4' title={name}>
                    { name.length > 20 ? name.slice(0, 20) + '...' : name} 
                    </h5>
                    <h6>Price : <span>${price} </span></h6>
                    <h6>Quantity : <span>{quantity} </span> </h6>
                </div>
                <div className="delete-btn">
                    <button onClick={()=>removeItem(product)}>
                        <FontAwesomeIcon className='dlt-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
           
        </div> 
    );
};

export default Review;
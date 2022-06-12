import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {product,handleCart} = props
    const {img , name ,price ,seller, ratings} = product
    return (
        <div>
           <div className='product mb-0'>
           <img className='img-fluid' src={img} alt="" /> 
           <div className='product-info'>
                <h5 className='product-name mt-3'>{name}</h5>
                <h5 className=''>Price: ${price}</h5>
                <p > <small className='seller'>Seller: {seller}</small> </p>
                <p > <small className='ratings'>Ratings: {ratings} stars</small> </p>
           </div>
        </div>
        <button onClick={()=>{handleCart(product)}} className='mb-5 button'>Add to Cart <FontAwesomeIcon className='ms-2' icon={faShoppingCart}></FontAwesomeIcon></button> 
        </div>
        
    );
};

export default Product;
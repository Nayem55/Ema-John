import React from "react";
import Product from "../Product/Product";
import { addToDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Shop.css";
import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Shop = ({open}) => {
  const [products] = useProduct();
  const [cart, setCart] = useCart(products);
  const navigate = useNavigate()

  const handleCart = (selectedProduct) => {
    let newCart = [];
    const exist = cart.find((product) => product.id === selectedProduct.id);
    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exist.quantity = exist.quantity + 1;
      newCart=[...rest,exist];  
    }
    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  const clearCart = () => {
    localStorage.removeItem("shopping-cart");
    setCart([]);
  };
  let price = 0;
  let shipping = 0;
  let quantity = 0;

  cart.forEach((product) => {
    quantity = quantity + product.quantity;
    price = price + product.price * product.quantity;
    shipping = shipping + product.shipping * product.quantity;
  });

  const handleReview=()=>{
    navigate('/orders')
  }

  return (
    <div className="shop-container">
      <div className="product-container ">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleCart={handleCart}
          ></Product>
        ))}
      </div>

      <div className="sticky-top">
      
      <div className={`cart-container ${open ? 'show' : 'hide' } `}>
        <h2 className="text-center pt-1">Order summary</h2>
        <div className="cart-info">
          <p>Selected Items: {quantity}</p>
          <p>Total Price: ${price}</p>
          <p>Total Shipping Charge: ${shipping}</p>
        </div>
        <h4 className="total"> Grand Total:{price + shipping} $</h4>
        <div className="btn-container">
          <button onClick={clearCart} className="clear">
            Clear Cart <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
          <button onClick={handleReview} className="review">
            Review Order <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      </div>

      
    </div>
  );
};

export default Shop;
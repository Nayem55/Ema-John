import React from "react";
import useCart from "../../hooks/useCart";
import useProduct from "../../hooks/useProduct";
import "./Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Review from "../Review/Review";
import { removeFromDb } from "../../utilities/fakedb";
import { useNavigate } from "react-router-dom";

const Orders = ({ open }) => {
  const [products] = useProduct();
  const [cart, setCart] = useCart(products);
  const navigate = useNavigate();

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

  const removeItem = (item) => {
    const rest = cart.filter((product) => product.id !== item.id);
    setCart(rest);
    removeFromDb(item.id);
  };
  return (
    <div className="order-container ">
      <div className="order-product-container">
        <h2>
          {cart.map((product) => (
            <Review
              key={product.id}
              product={product}
              removeItem={removeItem}
            ></Review>
          ))}
        </h2>
      </div>

      <div className="cart-position">
        <div className={`order-cart-container  ${open ? "show" : "hide"}`}>
          <h2 className="text-center pt-1">Order summary</h2>
          <div className="cart-info">
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${price}</p>
            <p>Total Shipping Charge: ${shipping}</p>
          </div>
          <h4 className="total"> Grand Total:{price + shipping} $</h4>
          <div className="order-btn-container">
            <button onClick={clearCart} className="clear">
              Clear Cart <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
            {/* <Link className="w-100" to={"/purchase"} > */}
                <button onClick={()=>navigate('/purchase')} className="review">
                  Purchase Order
                  <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </button>
            {/* </Link> */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

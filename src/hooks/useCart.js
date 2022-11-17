import { useEffect } from "react";
import { useState } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart=(products)=>{

    const [cart, setCart] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/cart')
      .then(res=>res.json())
      .then(data=>setCart(data))
      // const storedCart = getStoredCart();
      // const savedCart = [];
      // for (const _id in storedCart) {
      //   const addedProduct = products.find((product) => product._id === _id);
      //   if (addedProduct) {
      //     const quantity = storedCart[_id];
      //     addedProduct.quantity = quantity;
      //     savedCart.push(addedProduct);
      //   }
      // }
      // setCart(savedCart);
    }, [products]);

    return [cart, setCart];
}

export default useCart;
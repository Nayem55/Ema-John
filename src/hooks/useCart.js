import { useEffect } from "react";
import { useState } from "react";

const useCart=(products)=>{

    const [cart, setCart] = useState([]);

    useEffect(() => {
      fetch('https://ema-john-server-nayemweb10.vercel.app/cart')
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
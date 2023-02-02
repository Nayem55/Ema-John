import { useEffect } from "react";
import { useState } from "react";

const useCart=()=>{

    const [cart, setCart] = useState([]);

    useEffect(() => {
      fetch('https://ema-john-server-black.vercel.app/cart')
      .then(res=>res.json())
      .then(data=>setCart(data))
    }, []);

    return [cart, setCart];
}

export default useCart;
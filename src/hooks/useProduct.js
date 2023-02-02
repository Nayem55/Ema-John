import { useState, useEffect } from "react";

const useProduct=()=>{
    const [Allproducts,setAllProducts]= useState([]);

    useEffect(() => {
        fetch("https://ema-john-server-black.vercel.app/allproducts")
          .then((res) => res.json())
          .then((data) => setAllProducts(data));
      }, []);

      return [Allproducts,setAllProducts];

}

export default useProduct;
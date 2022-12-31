import { useState, useEffect } from "react";

const useProduct=()=>{
    const [Allproducts,setAllProducts]= useState([]);

    useEffect(() => {
        fetch("https://ema-john-server-ta34.onrender.com/allproducts")
          .then((res) => res.json())
          .then((data) => setAllProducts(data));
      }, []);

      return [Allproducts,setAllProducts];

}

export default useProduct;
import { useState, useEffect } from "react";

const useProduct=()=>{
    const [Allproducts,setAllProducts]= useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/allproducts")
          .then((res) => res.json())
          .then((data) => setAllProducts(data));
      }, []);

      return [Allproducts,setAllProducts];

}

export default useProduct;
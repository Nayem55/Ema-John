import React from "react";
import Product from "../Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Shop.css";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import useProduct from "../../hooks/useProduct";

const Shop = ({ open }) => {
  const [Allproducts]= useProduct();
  const [products,setProducts]= useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const searchRef = useRef();
  const [searchText, setSearchText] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
      fetch(`http://localhost:5000/products?page=${page}&size=10`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }, [page]);

  useEffect(()=>{
    fetch('http://localhost:5000/productCount')
    .then(res=>res.json())
    .then(data=>{
      const count = data.count;
      const pages = Math.ceil(count/10);
      setPageCount(pages);
    })
  },[])

  const searchedProducts = Allproducts.filter((product) => product.name.includes(searchText?.toUpperCase()));

  const handleSearch = () => {
    setSearchText(searchRef.current.value);
  };

  const handleCart = (selectedProduct) => {
    let newCart = [];
    const exist = cart.find((product) => product._id === selectedProduct._id);
    if (!exist) {
      selectedProduct.quantity = 1;
      fetch('http://localhost:5000/cart',{
        method:'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(selectedProduct)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
      })
      newCart = [...cart,selectedProduct];
    }
    
    else {
      exist.quantity=exist.quantity+1;
      fetch('http://localhost:5000/cart',{
        method:'put',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(exist)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
      })
      const rest = cart.filter(item=>item._id!==exist._id)
      newCart = [...rest,exist];
     }
    setCart(newCart);
  };

  const clearCart = () => {
    fetch('http://localhost:5000/cart',{
      method:'delete',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
    })
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

  const handleReview = () => {
    navigate("/orders");
  };

  return (
    <div className="shop-container">
      <div>
        <div className="search">
          <div className="d-flex">
            <input type="text" ref={searchRef} placeholder="Search" />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="product-container ">
          {searchText
            ? searchedProducts.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  handleCart={handleCart}
                ></Product>
              ))
            : products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  handleCart={handleCart}
                ></Product>
              ))
              }
        </div>
        <div className="pages">
          {
            [...Array(pageCount).keys()].map(index=><button className={page===index ? 'selected' : ''} onClick={()=>setPage(index)}>{index+1}</button>)
          }
        </div>
      </div>

      <div className="sticky-top">
        <div className={`cart-container ${open ? "show" : "hide"}`}>
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
              Review Order{" "}
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

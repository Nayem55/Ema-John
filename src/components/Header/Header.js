import React from "react";
import logo from "../../images/Logo.svg";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = ({open , setOpen}) => {
  return (
    <div className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark header">
        <div className="container-fluid ">
          <img src={logo} alt="" />
          <FontAwesomeIcon onClick={()=>setOpen(!open)} className="cart-icon" icon={faCartPlus }></FontAwesomeIcon>
          <button
            className="navbar-toggler mb-2 bg-1 mt-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse navLink"
            id="navbarTogglerDemo01"
          >
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <Link to="/shop">Shop</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/inventory">Inventory</Link>
              <Link to="/about">About</Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

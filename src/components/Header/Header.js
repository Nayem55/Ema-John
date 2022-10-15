import React from "react";
import logo from "../../images/Logo.svg";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

const Header = ({ open, setOpen }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
    setNavOpen(false);
  };
  window.addEventListener("scroll", () => {
    setScroll(window.scrollY);
  });
  useEffect(() => {
    setOpen(false);
  }, [scroll]);
  return (
    <div className="fixed-top">
      <nav className="header">
        <div className="nav-icons">
          <img src={logo} alt="" />

          <FontAwesomeIcon
            onClick={() => {
              setOpen(!open);
              setNavOpen(false);
            }}
            className="cart-icon"
            icon={faCartPlus}
          ></FontAwesomeIcon>

          <button
            className="nav-menu"
            onClick={() => {
              setOpen(false);
              setNavOpen(!navOpen);
            }}
          >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </button>
        </div>

        <div className={`navLink ${navOpen ? "navShow" : "navHide"}`}>
          <Link onClick={() => setNavOpen(false)} to="/shop">
            Shop
          </Link>
          <Link onClick={() => setNavOpen(false)} to="/orders">
            Orders
          </Link>
          <Link onClick={() => setNavOpen(false)} to="/inventory">
            Inventory
          </Link>
          <Link onClick={() => setNavOpen(false)} to="/about">
            About
          </Link>
          {user ? (
            <Link to="/login" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
            </Link>
          ) : (
            <Link onClick={() => setNavOpen(false)} to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;

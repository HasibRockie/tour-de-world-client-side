import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo.png";
import useAuth from './../../Contexts/useAuth';

const Header = () => {
  const {user, loggedIn, handleSignout, cart, userProfile, profileId, allUsers, setCart, setOrders, setUserProfile} = useAuth()
  const profileUrl = `/profile/${profileId}`



  return (  
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/">
            <p className="navbar-brand logo-header">
              <img src={logo} className="logo" height="28" alt="CoolBrand" />
            </p>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
              <Link to="/">
                <span className="nav-item nav-link active">Home</span>
              </Link>
              <Link to="/Services">
                <span className="nav-item nav-link">Services</span>
              </Link>
              <Link to="/placeorder">
                <span className="nav-item nav-link">Orders</span>
              </Link>
              <Link to='/profile'>
                <span className="nav-item nav-link">Profile</span>
              </Link>
              <Link to="/manage">
                <span className="nav-item nav-link">Manage</span>
              </Link>
            </div>
            <div className="navbar-nav ms-auto">
              {
                !loggedIn ? <Link to="/login">
                <span className="nav-item nav-link">Login</span>
              </Link> : <div>
                <span className="cart"><i className="fas fa-cart-arrow-down "></i><p>{userProfile?.cart?.length}</p> </span>
                <span className="display-name">{user.displayName}</span> 
                <button onClick={handleSignout} className="btn btn-danger"><i className="fas fa-sign-out-alt"></i> Logout</button>
              </div> 
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

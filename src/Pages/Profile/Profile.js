import React from "react";
import { useParams } from "react-router";
import useAuth from "./../../Contexts/useAuth";
import { useEffect } from "react";
import SingleService from "./../SingleService/SingleService";

import "./Profile.css";
import { useState } from "react/cjs/react.development";

const Profile = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const { setUserProfile, userProfile, user, profileId, allUsers } = useAuth();

  const { cart, orders } = useAuth();
  // console.log(user);
  // const {cart} = userProfile

 const totalPriceFunc = () => {
   let total = 0;
   cart.forEach(ct => {
      total += parseInt(ct.price)
   })
   return total 
 }

  return (
    <div className="profile">
      <div className="image">
        <img className="user-profile-pic" src={user.photoURL} alt="" />
        <p>
          <p className="name-title"> Name:</p> <hr />{" "}
          <span>{user.displayName}</span>
        </p>
        <p>
          <p className="name-title"> Email:</p> <hr />
          <span>{user.email}</span>
        </p>
      </div>
      <div className="cart-all">
        <h6 className="cart-title">Your Cart</h6>
        <hr />
        <div className="cart-items">
          {cart.map((ct) => (
            <CartShow
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
              key={ct._id}
              ct={ct}
            ></CartShow>
          ))}
        </div>
      </div>
      <div className="cart-all">
        <h6 className="cart-title">Checkout</h6>
        <hr />
        <div className="cart-items">
          <h4 className='price-sum'>
            
            Total Price: <span className="totalPrice">${totalPriceFunc()}</span>
          </h4>
          <button className="confirm">Confirm Now</button>
        </div>
      </div>
    </div>
  );
};

const CartShow = (props) => {
  const { ct, setTotalPrice, totalPrice } = props;
 
  return (
    <div className="cart-row">
      <img src={ct.image} alt="" />
      <h5>{ct.title}</h5>
      <h5 className="price">${ct.price}</h5>
      <button>
        <i className="far fa-trash-alt"></i>
      </button>
      
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "./../../Contexts/useAuth";

import "./Profile.css";

const Profile = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const {
    setUserProfile,
    userProfile,
    user,
    allUsers,
    setCart,
    setOrders,
  } = useAuth();

  const { cart } = useAuth();
  

  useEffect(() => {
    const present = allUsers.filter(
      (singleUser) => singleUser.user.email === user?.email
    );
    setUserProfile(present[0]);

    setCart(userProfile?.cart || []);
    setOrders(userProfile?.orders || []);
  }, [allUsers, setCart, setOrders, setUserProfile, user?.email, userProfile?.cart,  userProfile?.orders]);

  const displayCart = userProfile?.cart || [];

  const totalPriceFunc = () => {
    let total = 0;
    cart.forEach((ct) => {
      total += parseInt(ct.price);
    });
    return total;
  };

  return (
    <div className="profile">
      <div className="image">
        <img className="user-profile-pic" src={user.photoURL} alt="" />
        <h6>
          <p className="name-title"> Name:</p> <hr />{" "}
          <span>{user.displayName}</span>
        </h6>
        <h6>
          <p className="name-title"> Email:</p> <hr />
          <span>{user.email}</span>
        </h6>
      </div>
      <div className="cart-all">
        <h6 className="cart-title">Your Cart</h6>
        <hr />
        <div className="cart-items">
          {displayCart.map((ct) => (
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
          <h4 className="price-sum">
            Total Price: <span className="totalPrice">${totalPriceFunc()}</span>
          </h4>
          <Link to="/placeorder">
            <button className="confirm">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartShow = (props) => {
  const { ct } = props;

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

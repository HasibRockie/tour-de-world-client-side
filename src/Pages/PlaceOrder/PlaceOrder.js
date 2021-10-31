import React, { useEffect, useRef, useState } from "react";
import "./PlaceOrder.css";
import useAuth from "./../../Contexts/useAuth";

const PlaceOrder = () => {
  const {
    user,
    cart,
    orders,
    userProfile,
    setUserProfile,
    allUsers,
    setCart,
    setOrders,
  } = useAuth();
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [id, setId] = useState(null);
  const [details, setDetails] = useState({
    name: name,
    email: email,
    phone: "",
    city: "",
    address: "",
  });
  const phoneRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();

  const handleName = (e) => {
    const updatedName = e.target.value;
    setName(updatedName);
  };
  const handleEmail = (e) => {
    const updatedEmail = e.target.value;
    setEmail(updatedEmail);
  };
  
  const handlePlaceOrder = () => {
      setOrders(cart)
      setCart([])
    const url = `http://localhost:5000/users/${userProfile._id}`;
    const object = { ...userProfile, cart:[], orders: cart}
    console.log(url);
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((res) => {
        console.log(res);
        setUserProfile({...userProfile,cart:[], orders: cart})
        alert("Congrats! Your Order is Confirmed!")
        console.log(userProfile);
      })
      .catch((err) => console.log(err));
  }



  const handleUpdateCart = (e) => {
    e.preventDefault();
    const phone = phoneRef.current.value;
    const city = cityRef.current.value;
    const address = addressRef.current.value;
    const detailsInfo = { name, email, phone, city, address };

    setDetails(detailsInfo);
    setId(userProfile._id);
    
    setUserProfile({ ...userProfile, details: detailsInfo });
    // put method
    const url = `http://localhost:5000/users/${userProfile._id}`;
    console.log(url);
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...userProfile, details: detailsInfo }),
    })
      .then((res) => {
        console.log(res);
        console.log(userProfile);
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };

  useEffect(() => {
    const present = allUsers.filter(
      (singleUser) => singleUser.user.email === user?.email
    );
    setUserProfile({ ...present[0], details });

    setCart(present[0]?.cart || []);
    setOrders(present[0]?.orders || []);
    
  }, []);

  return (
    <div className="place-order">
      <div className="box-placeorder">
        <form onSubmit={handleUpdateCart}>
          <fieldset>
            <legend>
              <h4>Your Details</h4>
            </legend>
            <div className="manage-half half2">
              <input
                onChange={handleName}
                type="text"
                value={name}
                placeholder="Your Name"
                required
              />
              <input
                onChange={handleEmail}
                type="text"
                value={email}
                placeholder="Email"
                required
              />
              <input
                ref={phoneRef}
                type="text"
                placeholder="Phone no."
                required
              />{" "}
              <input
                ref={cityRef}
                type="text"
                placeholder="City/Address"
                required
              />
              <input
                ref={addressRef}
                type="text"
                placeholder="Shipping Address"
                required
              />
            </div>

            <button className="update-btn" type="submit">
              Update
            </button>
          </fieldset>
        </form>
      </div>
      <div className="placeorder-details">
        <div>
            <h6>Name: </h6>
            <h6 className="user-details">{details?.name}</h6>
        </div>
        <div>
            <h6>Email: </h6>
            <h6 className="user-details">{details?.email}</h6>
        </div>
        <div>
            <h6>Phone: </h6>
            <h6 className="user-details">{details?.phone}</h6>
        </div>
        <div>
            <h6>City: </h6>
            <h6 className="user-details">{details?.city}</h6>
        </div>
        <div>
            <h6>Address: </h6>
            <h6 className="user-details">{details?.address}</h6>
        </div>
        
            <button type="submit" onClick={handlePlaceOrder} disabled={!details?.address}>Place Order</button>
        
      </div>
    </div>
  );
};

export default PlaceOrder;

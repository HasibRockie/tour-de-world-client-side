import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./SingleService.css";
import useAuth from './../../Contexts/useAuth';

const SingleService = () => {
  const { service } = useParams();
  const [singleService, setSingleService] = useState({});
  const url = `https://tour-de-world-private-limited.herokuapp.com/services/${service}`;
  const {handleAddToCart} = useAuth()

  // const handleAddToCart = (service) => {
  //   cart.push(service)
  //   const url = `https://tour-de-world-private-limited.herokuapp.com/users/${userProfile._id}`;
  //   fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ user: user, cart: cart, orders: orders }),
  //   })
  //     .then((res) => {
  //       alert("successfully added to the cart!")
  //       // setCart([...cart, service]);
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSingleService(data));
  }, []);

  const { title, duration, price, image } = singleService;

  return (
    <div className="service-details">
      <div className="details-half service-box">
        <img className="service-image" src={image} alt="" />
        <h5>{title}</h5>
      </div>
      <div className="details-half">
        <hr />
        <p>Duration: {duration}</p>
        <hr />
        <p>Price: $ {price}</p>
        <hr />
        <div className="service-buttons service-button2">
          <button onClick={() => handleAddToCart(singleService)}>Add to Cart</button>
          <Link to='/placeorder'><button>Place Order</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SingleService;

import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import "./SingleService.css";

const SingleService = () => {
  const { service } = useParams();
  const [singleService, setSingleService] = useState({});
  const url = `https://tour-de-world-private-limited.herokuapp.com/services/${service}`;

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
          <button>Add to Cart</button>
          <button>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default SingleService;

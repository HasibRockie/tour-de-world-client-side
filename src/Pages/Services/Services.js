import React from "react";
import "./Services.css";
import useAuth from "./../../Contexts/useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const Services = () => {
  const { services, cart, setCart, setUserProfile, user, orders } = useAuth();

  return (
    <div>
      <h2 className="service-title"> OUR SERVICES </h2>
      <div className="services-all">
        {services.map((service) => (
          <Service service={service} key={service._id}></Service>
        ))}
      </div>
    </div>
  );
};

const Service = (props) => {
  const { service } = props;
  const { services, cart, setCart, setUserProfile, userProfile, user, orders } =
    useAuth();

  useEffect(() => {
    setUserProfile({ user, cart, orders });
  }, []);

  const handleAddToCart = async (service) => {
    const url = `http://localhost:5000/users/${userProfile._id}`;
    setCart([...cart, service]);
    console.log(cart, userProfile);
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userProfile),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const url = `/services/${service._id}`;
  return (
    <div className="item items2">
      <img src={service.image} alt="" />
      <h5 className="service-name">{service.title}</h5>
      <p className="service-duration">{service.duration}</p>
      <p className="service-price">${service.price}</p>
      <div className="service-buttons">
        <Link to={url}>
          <button>View Details</button>
        </Link>
        <button onClick={() => handleAddToCart(service)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Services;

import React  from "react";
import "./Services.css";
import useAuth from "./../../Contexts/useAuth";
import { Link } from "react-router-dom";

const Services = () => {
  const { services } = useAuth();

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
  const {  handleAddToCart } = useAuth();

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

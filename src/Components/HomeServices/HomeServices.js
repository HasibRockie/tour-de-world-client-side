import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "./HomeServices.css";
import useAuth from './../../Contexts/useAuth';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    // optional, default to 1.
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    partialVisibilityGutter: 90,
  },
};






const HomeServices = ({deviceType}) => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://tour-de-world-private-limited.herokuapp.com/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="carousel-home">
        <div>
            <h3 className="service-head">Popular Services</h3>
        </div>
      <Carousel
      centerMode={true}
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} 
        deviceType={deviceType}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        focusOnSelect={true}
      >
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </Carousel>
    </div>
  );
};

const Service = (props) => {

  const {cart, user, orders, userProfile} = useAuth()
  // console.log(cart);
  const handleAddToCart = (service) => {
    cart.push(service)
    const url = `https://tour-de-world-private-limited.herokuapp.com/users/${userProfile._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: user, cart: cart, orders: orders }),
    })
      .then((res) => {
        alert("successfully added to the cart!")
        // setCart([...cart, service]);
      })
      .catch((err) => console.log(err));
     
  };
  const { service } = props;
  const url = `/services/${service._id}`
  return (
    <div className="item">
      <img src={service.image} alt="" />
      <h5>{service.title}</h5>
      <p>{service.duration}</p>
      <p>$ {service.price}</p>
      <div className="service-buttons">
          <button onClick={() => handleAddToCart(service)}>Add to Cart</button>
          <Link to={url}><button>See Details</button></Link>
        </div>
    </div>
  );
};

export default HomeServices;

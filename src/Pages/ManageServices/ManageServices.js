import React, { useRef } from "react";
import "./ManageServices.css";
import { axios } from "axios";

const ManageServices = () => {
  const titleRef = useRef();
  const imgLinkRef = useRef();
  const durationRef = useRef();
  const priceRef = useRef();

  const handleManageService = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const duration = durationRef.current.value;
    const price = priceRef.current.value;
    const image = imgLinkRef.current.value;
    const data = { image, title, duration, price };
    console.log(data);

    fetch("http://localhost:5000/services", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("successfully added!");
        e.target.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="manage">
      
      <div className="add-list">
        <form onSubmit={handleManageService}>
          <fieldset>
            <legend><h1>Add New Services </h1></legend>
          <div className="manage-half">
            <input type="text" ref={titleRef} placeholder="Tour Spot" required/>
            <input type="text" ref={durationRef} placeholder="Duration"required />
          </div>
          <div className="manage-half">
            <input type="text" ref={priceRef} placeholder="Package Price" required />{" "}
            <input type="url" ref={imgLinkRef} placeholder="image link" required />
          </div>

          <button type="submit">Add</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ManageServices;

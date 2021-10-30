import React, { useRef } from "react";
import "./ManageServices.css";
import { axios } from "axios";
import useAuth from "./../../Contexts/useAuth";
import { useState } from "react/cjs/react.development";
import ShowUser from './ShowUser';

const ManageServices = () => {
  const { allUsers } = useAuth();
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

    fetch("https://tour-de-world-private-limited.herokuapp.com/services", {
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
            <legend>
              <h1>Add New Services </h1>
            </legend>
            <div className="manage-half">
              <input
                type="text"
                ref={titleRef}
                placeholder="Tour Spot"
                required
              />
              <input
                type="text"
                ref={durationRef}
                placeholder="Duration"
                required
              />
            </div>
            <div className="manage-half">
              <input
                type="text"
                ref={priceRef}
                placeholder="Package Price"
                required
              />{" "}
              <input
                type="url"
                ref={imgLinkRef}
                placeholder="image link"
                required
              />
            </div>

            <button type="submit">Add</button>
          </fieldset>
        </form>
      </div>

      <hr />
      <div className="all-users">
        <h2>See All Users</h2>
        <br />

        <table class="table table-striped">
          <thead>
            <tr>
             
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Cart</th>
              <th scope="col">Orders</th>
              <th scope="col">Status</th>
              <th scope="col">Order Approval</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {allUsers.map((user) => (
              <ShowUser key={user._id} user={user}></ShowUser>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default ManageServices;

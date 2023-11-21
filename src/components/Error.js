import React from "react";
import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <div className="container my-5">
        <div className="container my-5">
          <h1>
            <span className="text-danger"> 404 Error</span> : Page Not Found
          </h1>
          <p>The page you are looking for does not exist !</p>
        </div>
        <div className="container">
          <button className="btn btn-info">
            {" "}
            <NavLink to="/" className="text-dark">
              {" "}
              Go To Home
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
};
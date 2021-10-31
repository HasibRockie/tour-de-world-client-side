import React from "react";
import "./Signin.css";
import logo from '../../Components/Header/logo.png'
import useAuth from './../../Contexts/useAuth';

const Signin = () => {
    const {handleGoogleSignin} = useAuth()
  return (
    <div className="signin">
        <img className="logo2" src={logo} alt="" />
      <div className="box">
          <h4>Login With</h4>
        <button onClick={handleGoogleSignin}>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtOB0jFYqRHvCCNMXOXX5futXNw8RYdObmKQ8v3cC_pE_R0Kry2Y7fi5f_VClhfSrm7Hg&usqp=CAU" alt="" />
                <span>Continue with Google</span>
            </div>
        </button>
      </div>
      
    </div>
  );
};

export default Signin;

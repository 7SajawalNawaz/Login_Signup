import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Signup.css";
import { handleError, handleSuccess } from "../../utils";
const Signup = () => {
  // USE STATE FOR LOGIN

  const [signupInfo , setSignupInfo]=useState({
    name:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();
//   HANDLE CHANGE

const handleChange=(e)=>{
    const {name , value}=e.target
    console.log(name , value);
    const copySignupInfo={...signupInfo}
    copySignupInfo[name]=value
   setSignupInfo( copySignupInfo)
}
console.log('..LoginInfo->' , signupInfo);

// for handling signup

const handleSignup= async  (e) => {
    e.preventDefault()
    const {name , email , password}=signupInfo;
    if (!name || !email || !password){
       return handleError('Input fields are required!')
    }
    try{
        const url='http://localhost:8080/auth/signup'
        const response= await fetch(url,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body : JSON.stringify(signupInfo)

        })
        const result=await response.json()
        const {success , message , error}=result;
        if(success){
            handleSuccess(message)
            setTimeout(()=>{
                navigate("/login")
            } , 1000)
        }
        else if (password.length < 4) {
            return handleError('Password must be at least 4 characters long.');
        }
         else if (!success){

            handleError(message)

        }
        console.log(result);
        
    }
    catch(err){
       handleError(err)
    }
}

  return (
    <div className="container">
      <h1>Sign Up</h1>

      <form className="form"
      onSubmit={handleSignup}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
          onChange={handleChange}
          type="email" 
          name="email"
           placeholder="Enter your email" 
           value={signupInfo.email}
           />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
          onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
          />
        </div>

        <div>
          <button type="submit">Sign Up</button>
          <span>
            Already have an account ?<Link to="/login">Login</Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;

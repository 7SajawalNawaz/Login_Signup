import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";

const App = () => {
  return (
    <div className="App">
      <Routes>
        
        {/* For direct navigate to login page */}
        <Route path="/" element={<Navigate to="/login"/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

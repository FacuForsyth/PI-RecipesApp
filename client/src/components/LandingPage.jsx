import React from "react";
import { Link } from "react-router-dom";
import '../styles/landingPage.css';

export default function LandingPage(){
  return(
    <div className="landing">
      <h1 className="title">Welcome to the Recipe Site</h1>
      <Link to='/home'>
        <button className="landing-button">Click here</button>
      </Link>
    </div>
  )
};
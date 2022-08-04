import React from "react";
import { Link } from "react-router-dom";
import '../styles/404.css';

export default function ErrorFound(){
  return (
    <div className="error_notfound">
    <h1>ERROR 404 - NOT FOUND</h1>
    <h3>We're very sorry, but that page doesn't exist or has been moved.</h3>

    <Link to='/home'><button className="button_back404">Back to Recipes</button></Link>
    </div>
  )
};
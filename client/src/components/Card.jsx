import React from "react";
import { Link } from "react-router-dom";
import '../styles/card.css'

export default function Card({ title, image, diets, id }) {
  //const info = {title, image, diets, id}
  return(
    <div className="card">
      <img className="card_img" src={image} alt='img not found' width='200px' height='200px' />
      <div className="card_info">{title ? (
				<Link className="card_info" to={`/recipes/${id}`}>{title}</Link>
			  ) : (
				<h3>'No se encontraron Recetas'</h3>
			  )}
      </div>
      <div className="card_info2">{diets.join(' - ')}</div>
      <Link className="link_id" to={`/recipes/${id}`}>Read more...</Link>
    </div>
  )
};
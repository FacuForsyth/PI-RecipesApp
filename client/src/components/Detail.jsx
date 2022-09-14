import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, Detail2 } from "../actions";
import axios from "axios";
import '../styles/detail.css'
import { useState } from "react";
import Loading from "./Loading";

export default function Detail(props){
  //console.log(props); //props tiene un location, match y history
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = props.match.params //accedo al ID
  const recipeId = useSelector(state => state.details)
  
  useEffect(()=> {
    setLoading(true);
    dispatch(getDetails(id))
    return ()=> dispatch(Detail2());
  },[dispatch]);

  //console.log(recipeId[0])

  async function handleClick(e) {
    //e.preventdefault();
    await axios.delete(`http://localhost:3001/recipes/${id}`);
    alert("Receta eliminada con exito");
    history.push('/home')
  }

  return(
    <div>
      {loading ? (
        <div>
        {recipeId.length > 0 ? (
        <div className="detail">
          <div className='detail2'>
            <div className="head_detail">
              <img className="img_detail" src={recipeId[0].image} alt="" width="300px" height="300px"/>

              <div className="head_detail2">
                <h1>{recipeId[0].title}</h1>
                <h2>HealthScore: {recipeId[0].healthScore}</h2>
                <h3>Diets: {recipeId[0].diets ? recipeId[0].diets.map(d => d).join(', ') : 'cargando diets de DB...' }</h3>
              </div>
            </div>
      
            <div className="body_detail">
              <h3 className="font_detail">Summary:</h3>
              <div className="font_detail" dangerouslySetInnerHTML={{__html: recipeId[0].summary}}/> 
        
              <h3 className="font_detail">Steps:</h3>
              <div className="font_detail">{recipeId[0].steps}</div>
            </div>
          </div>
    
          <Link to="/home">
            <button id="buttonReturn">Return</button>
          </Link>

          {id.includes('-')? 
            <button id="buttonDelete" onClick={(e) => handleClick(e)}>Delete Recipe</button>
            : ""
          }
          <br/>
        </div>
        ) : <Loading /> }
        </div>  
        ) : (
          <Loading />
      )}
  </div>     
  )
};
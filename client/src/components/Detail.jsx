import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, Detail2 } from "../actions";
import '../styles/detail.css'

export default function Detail(props){
  const dispatch = useDispatch();
  const { id } = props.match.params //accedo al ID
  
  useEffect(()=> {
    dispatch(getDetails(id))
    return ()=> dispatch(Detail2());
  },[dispatch]);

  const recipeId = useSelector(state => state.details)
  //console.log(recipeId[0])

  return(
    <div className="detail">
      {recipeId.length === 0 ? (
        
        <div className="loading1">
        <img className="loading1" alt="loading" src='https://i.pinimg.com/originals/35/b9/3e/35b93ef8b6ff936de6d8524ebe4bfce2.gif' id="img" />
        </div>

        ) :
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
      }
        <Link to="/home">
        <button id="buttonReturn">Return</button>
        </Link>
      <br/>
    </div>
  )
};

/* src="https://i.gifer.com/14UV.gif" */
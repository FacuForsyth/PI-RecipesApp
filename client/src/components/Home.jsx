import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getRecipes, getDiets, filterDiets, filterCreated, orderName, orderHeadScore } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../styles/home.css'

export default function Home() {

  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);
  const allDiets = useSelector(state => state.diets);
//paginadoooo
const [order, setOrder] = useState('')
  
//empieza en la pag
const [pageNumber, setPageNumer] = useState(1); //1 empieza en esa pag
  //console.log('curr:', pageNumber)

//cuantos juegos por pagina
const [recipesPerPage] = useState(9);
//indice para el ultimo juego
const ultimaReceta = pageNumber * recipesPerPage; //9
const primerReceta = ultimaReceta - recipesPerPage; //0
const currentRecipes = allRecipes.slice(primerReceta, ultimaReceta);

const paginado = (num) => {
  setPageNumer(num);
};

  useEffect(()=>{
    //despacho la action
    dispatch(getRecipes());
    dispatch(getDiets());
  //si dependo de otro estado o algo por ejempo []
  },[dispatch]);

  //boton de recetear los filtros y receteas
  function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
  };

  function handleFilterDiets(e){
    dispatch(filterDiets(e.target.value));
  };

  function handleFilterCreated(e){
    setPageNumer(1);
    dispatch(filterCreated(e.target.value));
  };

  function handleOrderName(e){
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setPageNumer(1);
    //seteo el estado local para que modifique solo en el renderizado
    setOrder(`Ordenado ${e.target.value}`)
  };

  function handleOrderScore(e){
    e.preventDefault();
    dispatch(orderHeadScore(e.target.value));
    setPageNumer(1);  //setea para que empieze en la pagina 1
    setOrder(`OrdenadoScore ${e.target.value}`)     //estado local para que lo setee
  }

  return(
    <div className="home">
      <div className="encabezado">
      <h1 className="titleHome">🍳 RECIPES</h1>
      
      <SearchBar />

      <Link to='/recipe' >
        <button className="buttonCreate" >Create Recipe</button>
      </Link>
      </div>

      <nav className="filters">
        <select className="filter1" onChange={e => handleFilterDiets(e)} >
          {allDiets.map(diet => {
            return <option value={diet.title} key={diet.id}>{diet.title}</option>
          })}
        </select>
        <select className="filter2" onChange={e => handleFilterCreated(e)}>
          <option value='all'>ALL</option>
          <option value='db'>CREATE</option>
          <option value='api'>API</option>
        </select>
        <select className="filter3" onChange={e => handleOrderName(e)}>
          <option value='a-z'>A-Z</option>
          <option value='z-a'>Z-A</option>
        </select>
        <select className="filter4" onChange={e => handleOrderScore(e)}>
          <option value='+'>HEAD SCORE -</option>
          <option value='-'>HEAD SCORE +</option>
        </select>

        <button className="resetRecipes" onClick={e => handleClick(e)} >
          Reset Recipes
        </button>
      </nav>

      <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado} />

      <div className="card_container">
        {
          currentRecipes.length === 0 
          ? <h2 className="not_found">Not recipe found</h2> 
          : currentRecipes?.map(rec =>{
            return(
                <Card title={rec.title} image={rec.image} diets={rec.diets} key={rec.id} id={rec.id} />
            )
          })
        }
      </div>
    </div>
  )
};
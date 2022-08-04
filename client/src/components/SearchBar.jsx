import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitleRecipes } from "../actions";
import '../styles/searchBar.css'

export default function SearchBar(){
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  //console.log(name)

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
  };

  function handleSubmit(e){
    e.preventDefault();
    if(!name) {alert('"Please insert a Recipe Name"')}
    else {
      dispatch(getTitleRecipes(name))
      setName('')
    }
  }

  return(
    <div className="searchBar" >
      <input
        id="inputName"
        type='text'
        placeholder='search recipes...'
        onChange={e => handleInputChange(e)}/>
      <button className="buttonSearch" type="submit" onClick={e => handleSubmit(e)}>Search</button>
    </div>
  )
};
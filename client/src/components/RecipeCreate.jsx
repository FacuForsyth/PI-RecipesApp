import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import '../styles/validaciones.css';
import '../styles/createRecipe.css';

function validate(input){
    let errors = {};
    //console.log('erros', errors)
    //console.log('score', input.healthScore) //si llega el numero
    if(!input.title) errors.title = '*Please insert a Name';
    if (!/^[a-zA-Z\s]*$/.test(input.title)) errors.title = "*Invalid name. Only Letters";
    if (input.healthScore < 0 || input.healthScore > 100) errors.healthScore = "*Please insert a numer 0 to 100";
    return errors;
};

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const diets2 = useSelector((state) => state.diets);
  //console.log(diets) //trae [{id: 1, title: 'dairy free'}, {}, {}]

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: '',
    summary: '', 
    steps: [], 
    healthScore: 0, 
    diets:[]  
  });
  //console.log(input.diets)

  //para rendelizarlas
  useEffect(() => {
    //console.log('ef');
    dispatch(getDiets())
  }, [dispatch]);

  function handleChange(e){
    e.preventDefault();
    setInput({
      ...input,
      //lo seteo con el value
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
  }))
  };

  function handleChangeStep(e) {
    e.preventDefault();
    setInput({
      ...input,
      steps: [e.target.value],
    });
  }

  function handleSelect(e){
    e.preventDefault();
    if(!input.diets.includes(e.target.value)){
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
  };

  function handleDelete(e){
    //console.log('e', e.target.value)
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== e.target.value) //filtrar por todos los que no sea esa dieta que clickie, devuelve el estado nuevo sin el elemento que clickie
    })
  };

  function handleSubmit(e){
    //console.log('subm');
    e.preventDefault();
    dispatch(postRecipe(input));
    alert('Receta creada con exito');
    setInput({
      title: '',
      summary: '', 
      steps: [], 
      healthScore: 0, 
      diets:[]  
    });
    history.push('/home')
  };

  return(
    <div className="create_recipe">
      <div className="head_createR">
        <h1 className="title_h1">Create Recipe</h1>
        <Link to='/home'><button className="button_backCR">Back to Recipes</button></Link>
      </div>
      <form className="form" onSubmit={e => handleSubmit(e)} >
        <div className="title_CR">
            <label className="label_CR" >Title:</label>
            <input
                key={input.id}
                className="input_CR"
                type='text' 
                value={input.title} 
                name='title' 
                onChange={e => handleChange(e)} />
            {errors.title && (
                <p className="error">{errors.title}</p>
            )}
        </div>

        <div className="title_CR">
            <label className="label_CR">Summary:</label>
            <input className="input_summaryCR" type='text' value={input.summary} name='summary' onChange={e => handleChange(e)} />
        </div>

        <div className="title_CR">
          <label className="label_CR">Steps:</label>
          <input 
            className="input_stepsCR"
            type='text' 
            value={input.steps} 
            name='steps' 
            onChange={e => handleChangeStep(e)} />
        </div>

        <div className="title_CR">
          <label className="label_CR">Health Score:</label>
          <input
            className="input_scoreCR" 
            type='number' 
            value={input.healthScore} 
            name='healthScore' 
            onChange={e => handleChange(e)} />
            {errors.healthScore && (
              <p className="error">{errors.healthScore}</p>
            )}
        </div>
        <div className="title_CR">
            <label className="label_CR">Image:</label>
            <input className="input_CR" type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
        </div>

        <div className="title_CR">
        <label className="label_CR">Diets:</label>
        <select className="select_dietsCR" onChange={e => handleSelect(e)} >
            {diets2.map((diet) => {
                return <option key={diet.title} value={diet.title}>{diet.title}</option>
            })}
        </select>        
        </div>

        <div className="delete_order">
        {input.diets.map(d =>
        <div key={d} >
          <p className="deleteDiet">{d}</p>
          <button className="botonX" value={d} onClick={(e)=> handleDelete(e)}>X</button>        
        </div>
        )}
        </div>
        
        <div className="title_CR">
        <button 
          className="button_createCR"
          type="submit" 
          disabled={!input.title ||
                    !input.steps ||
                    !input.image ||
                    input.healthScore > 100 ||
                    input.healthScore < 0 ||
                    !input.healthScore ||
                    !input.summary ||
                    input.diets.length < 1 } >
                    Create Recipe!
        </button>
        <span>*Complete all fields</span>
        </div>
    </form>
    </div>
  )
};
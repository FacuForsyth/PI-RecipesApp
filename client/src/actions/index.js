import axios from 'axios';

export function getRecipes(){
  return async function(dispatch){
    var recipesJson = await axios.get('http://localhost:3001/recipes');
    //console.log(recipesJson.data)
    return dispatch({
      type: 'GET_RECIPES',
      payload: recipesJson.data
    })
  }
};

export function getDiets(){
  return async function(dispatch) {
      var res = await axios.get('http://localhost:3001/diets',{

      });
      return dispatch({
          type: 'GET_DIETS',
          payload: res.data
      })
  }
};

export function getTitleRecipes(title){
  return async function(dispatch){
      var recipesTitle = await axios.get(`http://localhost:3001/recipes?name=${title}`);
      if(recipesTitle.data.length === 0) {
        dispatch({
          type: 'ERROR',
          payload: "Not recipe found",
        })
      }
      return dispatch({
        type: 'GET_RECIPES_TITLE',
        payload: recipesTitle.data
      })
  }
};

export function postRecipe(payload){
  return async function(dispatch){
    const resp = await axios.post('http://localhost:3001/recipe',payload);
    return resp
  }
};

export function filterDiets(diet){
  return{
    type: 'FILTER_DIETS',
    payload: diet
  }
};

export function filterCreated(payload){
  return{
    type: 'FILTER_CREATED',
    payload
  }
};

export function orderName(payload){
  return{
    type:'ORDER_NAME',
    payload
  }
};

export function orderHeadScore(payload){
  return{
      type: 'ORDER_HEAD_SCORE',
      payload
  }
};

export function getDetails(id){
  return async function(dispatch){
    try{
      var recipesID = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: 'GET_DETAILS',
        payload: recipesID.data
      })
    }catch(error){
      console.log(error)
    }
  }
};

export function Detail2(){
  return{
      type: 'DETAIL2'
  }
};
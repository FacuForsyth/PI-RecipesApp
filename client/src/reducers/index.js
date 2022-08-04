const initialState = {
  recipes: [], //arreglo que renderizo
  allRecipes: [],
  diets: [],
  details: [],
  error: "",
};

function rootReducer(state = initialState, action){
  switch (action.type) {
    case 'GET_RECIPES': 
      return{
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        details: [],
        error:""
      };

    case 'GET_DETAILS':
      return{
        ...state,
        details: action.payload
      };

    case 'DETAIL2':
      return{
        ...state,
        details: []
      };   
    
    case 'GET_DIETS':
      return{
        ...state,
        diets: action.payload,
      };

    case 'GET_RECIPES_TITLE':
      //console.log(action.payload.length)
      return{
        ...state,
        recipes: action.payload,
        error:""
      }

    case 'POST_RECIPE':
      return{
        ...state,
      };

    case 'FILTER_DIETS':
      const recips =  state.allRecipes.filter(rec => {
        return rec.diets.find(d => {
          //console.log('d',d) trae todas las dietas
          //console.log(action.payload) trae la que vino por target.value
          return action.payload === d
        })
      })
      //console.log(recips)
      return{
        ...state,
        recipes: recips
      };
      
    case 'FILTER_CREATED':
      const recips2 = state.allRecipes
      const createdFilter = action.payload === 'db'
                            ? recips2.filter(rec => (typeof rec.id) === 'string')
                            : recips2.filter(rec => !((typeof rec.id) === 'string'))
      return{
        ...state,
        recipes: action.payload === 'all' ? state.allRecipes : createdFilter
      }
    
    case 'ORDER_NAME':
      var sortedArr = action.payload === 'a-z' ?
      //sort para comparar 2 valores de la function y toLowerCase para que los ponga en minuscula
          state.recipes.sort(function(a, b) {
              if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1 };
              if(b.title.toLowerCase() > a.title.toLowerCase()) { return -1 };
              return 0;
          }) :
          state.recipes.sort(function(a, b) {
              if(a.title.toLowerCase() > b.title.toLowerCase()) { return -1 };
              if(b.title.toLowerCase() > a.title.toLowerCase()) { return 1 };
              return 0;
          });
          //console.log(sortedArr)
      return {
          ...state,
          recipes: sortedArr
      };

    case 'ORDER_HEAD_SCORE':
      const scoreArr = action.payload === '+' ?
      //sort para comparar 2 valores de la function
        state.recipes.sort(function(a, b) {
          if(a.healthScore > b.healthScore) { return 1 };
          if(b.healthScore > a.healthScore) { return -1 };
          return 0;
        }) :
        state.recipes.sort(function(a, b) {
          if(a.healthScore > b.healthScore) { return -1 };
          if(b.healthScore > a.healthScore) { return 1 };
          return 0;
        });
      return {
        ...state,
        recipes: scoreArr
      };

    default:
      return state;
  }
};

export default rootReducer;
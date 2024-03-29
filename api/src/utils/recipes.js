const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY_2 } = process.env;

//RECETAS DE LA API
const getApiInfo = async (req, res) => {
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_2}&addRecipeInformation=true&number=100`);

  const apiInfo = await apiUrl.data.results.map(rec => {
    return{
      title: rec.title,
      id: rec.id,
      summary: rec.summary.replace(/<[^>]*>?/g, ""),
      steps: rec.analyzedInstructions[0]?.steps.map((e) => e.step),
      healthScore: rec.healthScore,
      image: rec.image,
      diets: rec.diets.map(diet => {return diet[0].toUpperCase() + diet.substring(1)}),
      dishTypes: rec.dishTypes,
    }
  })
  return apiInfo;
};

//RECETAS DE LA DB
const getDBinfo = async () => {
  const dbRecipe = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['title'],
      through: {
        attributes: []
      },
    }
  })
  //retorno la receta con las dietas mapeadas
  return dbRecipe.map((rec => {
    return{
      title: rec.title,
      id: rec.id,
      summary: rec.summary,
      steps: rec.steps,
      healthScore: rec.healthScore,
      diets: rec.diets.map((diet) => diet.title),
      image: rec.image,
    }
  }))
};

//TODAS LAS RECETAS
const getAllRecipe = async() => {
  const api = await getApiInfo();
  const DB = await getDBinfo();
  //console.log(await getDBinfo())
  const allRecipe = DB.concat(api);
  //console.log(allRecipe)
  return allRecipe;
}

module.exports = {getAllRecipe}
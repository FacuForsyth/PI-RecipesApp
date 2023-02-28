const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getDietApi = async (req, res) => {
    const dietsAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`);

    const diets = dietsAPI.data?.results.map((rec) => rec.diets); 
    //console.log(diets)  [ [ 'gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan' ], [] ]
    //.flat para juntar los arreglos en uno solo
    const eachDiet = diets.flat()
    //console.log(eachDiet) //queda un arreglo con todas las dietas repetidas
    const allDiet = [...new Set(eachDiet)];
    //console.log(allDiet) //con new Set selecciona las recetas sin repetir en un arreglo 

    //Pasamos la primera letra de las dietas a mayuscula
    const allDietsMayusc = allDiet.map(diet => {
        return diet[0].toUpperCase() + diet.substring(1)})
    
    allDietsMayusc.map(d => {
        Diet.findOrCreate({
            where: {title: d}
        })
    });

    const allDiets = await Diet.findAll()
    //console.log(allDiets)
    return allDiets;
};

module.exports = {getDietApi}
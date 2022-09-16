const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY_3 } = process.env;
/* const { API_KEY_2 } = process.env;
const { API_KEY_3 } = process.env;
const { API_KEY_4 } = process.env;
const { API_KEY_5 } = process.env;
const { API_KEY_6 } = process.env;
const { API_KEY_7 } = process.env;
const { API_KEY_8 } = process.env;
const { API_KEY_9 } = process.env;
const { API_KEY_10 } = process.env; */

const getDietApi = async (req, res) => {
    const dietsAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b75a93cddbcf4489b619d5200ff4ccb5&addRecipeInformation=true&number=100`);

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
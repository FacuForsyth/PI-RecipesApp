const { Router } = require('express');
const { Recipe, Diet } = require("../db");

const routerCreatedRecipe = Router();

routerCreatedRecipe.post('/', async (req, res) => { 
  try{
    const { title, summary, healthScore, steps, image, diets } = req.body;

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      image,
    });
  
    //encontrar en la tabla Diet 
    const newDiet = await Diet.findAll({
      where:{
        title: diets.map(diet => diet) //.toLowerCase()
      }
    });
  
    newRecipe.addDiet(newDiet);
    res.status(202).send('Creaste una nueva receta');
  }
  catch(error){
    res.status(404).send('Faltan datos o existe un error para crear una receta nueva.');
  }
});

module.exports = routerCreatedRecipe;
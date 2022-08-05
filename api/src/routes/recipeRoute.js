const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllRecipe } = require('../utils/recipes')
const { Recipe } = require("../db");

const routerRecipe = Router();

// Configurar los routers  
// Ejemplo: router.use('/auth', authRouter);

//RECETAS POR NOMBRE
routerRecipe.get('/', async (req, res) => {
  try{
    const name = req.query.name;
    const totalRecipe = await getAllRecipe();
    if(name){
      const recipeName = await totalRecipe.filter(rec => rec.title.toLowerCase().includes(name.toLowerCase()));
      recipeName.length ?
        res.status(200).json(recipeName)
        : res.status(200).json([]);
    }else {
      res.status(200).json(totalRecipe);
    };
  }
  catch(error){
    res.status(400).send("Error del catch");
  }
});

//RECETA POR ID
routerRecipe.get('/:id', async (req, res) => {
  const id = req.params.id;

  try{
    const allRecipes = await getAllRecipe();

    if(id) {
      const recipeById = await allRecipes.filter(recipe => recipe.id == id)
      recipeById.length
        ? res.status(200).send(recipeById)
        : res.status(404).send("No existe receta con ese id");
    };
  }
  catch(error){
    res.status(400).send("Error");
  }
});

module.exports = routerRecipe;
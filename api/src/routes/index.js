const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerRecipe = require("./recipeRoute");
const routerDiet = require("./dietRoute");
const routerCreatedRecipe = require("./createRecipeRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', routerRecipe);
router.use('/diets', routerDiet);
router.use('/recipe', routerCreatedRecipe);

module.exports = router;
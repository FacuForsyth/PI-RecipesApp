const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDietApi } = require('../utils/diet')

const routerDiet = Router();

// Configurar los routers  
// Ejemplo: router.use('/auth', authRouter);
routerDiet.get('/', async (req, res) => {
    try{
        const allDiets = await getDietApi();
        //console.log('route', allDiets)
        res.status(200).json(allDiets)
    }
    catch(error){
        res.status(400).send("Error no cargaron las diet");
    }
});

module.exports = routerDiet;
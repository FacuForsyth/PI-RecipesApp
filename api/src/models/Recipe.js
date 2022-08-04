const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'recipe',
    {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allownull: false,
			},
			title: {
				type: DataTypes.STRING,
				allownull: false,
			},
			summary: {
				type: DataTypes.TEXT,
				allownull: false,
			},
			healthScore: {
				type: DataTypes.INTEGER,
				allownull: false,
        validate: {
          min: 0,
          max: 100
        }
      },
      steps: {
          type: DataTypes.ARRAY(DataTypes.TEXT)
      },
			image: {
				type: DataTypes.TEXT,
				allownull: true,
			},
		},
		{ timestamps: false }
	);
};

/* 
- [ ] Receta con las siguientes propiedades:
  - ID: *
  - Nombre *
  - Resumen del plato *
  - Nivel de "comida saludable" (health score)
  - Paso a paso

  id:
  title:
  summary:
  healthScore:
  analyzedInstructions: [ { steps[ { "number":1, "step":... } ] } ]


- [ ] Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre

           "dishTypes": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ],
*/
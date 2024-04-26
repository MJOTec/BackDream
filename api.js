const express = require('express')
const dotenv = require("dotenv")
const cors = require('cors'); // Importa el middleware cors
dotenv.config()

const app = express()
const port = 5001

var swaggerUI = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
var swaggerOptions = {
    explorer: true,
};

app.use(express.json())

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

//endpoint para generar la documentacion
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerOptions));

app.get('/', (req, res) => {
  res.send('Página inicial de la WebApi')
})

//Aquí están todas las rutas
app.use(require('./routes/routes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

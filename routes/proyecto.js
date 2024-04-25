const express = require('express')
const router = express.Router()
const ProyectoControllers = require('../controllers/proyecto.js')

router.get('/:matricula', ProyectoControllers.getProyecto)

module.exports = router;
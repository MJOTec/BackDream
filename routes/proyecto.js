const express = require('express');
const router = express.Router();
const ProyectoControllers = require('../controllers/proyecto.js');

// Ruta para obtener proyectos por matrícula
router.get('/:matricula', ProyectoControllers.getProyecto);

// Ruta para crear un nuevo proyecto
router.post('/crearproyecto', ProyectoControllers.crearProyecto);

module.exports = router;

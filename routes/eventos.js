const express = require('express')
const router = express.Router()
const EventosControllers = require('../controllers/eventos.js')

router.get('/', EventosControllers.getEventos)
router.get('/:matricula', EventosControllers.getEventosMatricula)
router.get('/individual/:id_evento', EventosControllers.getEventoIndividual)
router.post('/reservar', EventosControllers.postEventosReserva)

module.exports = router;
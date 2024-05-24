const express = require('express')
const router = express.Router()
const ReservaControllers = require('../controllers/reserva.js')

router.get('/:matricula', ReservaControllers.getReserva)
router.get('/horarios/:fecha', ReservaControllers.getHorarios)
router.post('/creareserva', ReservaControllers.createReserva)
router.delete('/cancelarreserva/:id', ReservaControllers.cancelReserva)

module.exports = router;
const express = require('express')
const router = express.Router()
const ReservaControllers = require('../controllers/reserva.js')

router.get('/:matricula', ReservaControllers.getReserva)
router.get('/RFID/:RFID', ReservaControllers.getReservaRFID)
router.get('/horarios/:fecha', ReservaControllers.getHorarios)
router.get('/hoy/allreservas', ReservaControllers.getHoy)
router.post('/creareserva', ReservaControllers.createReserva)
router.post('/creareservachat', ReservaControllers.createReservaChat)
router.delete('/cancelarreserva/:id', ReservaControllers.cancelReserva)
router.delete('/chatbot/cancelar/:id', ReservaControllers.cancelReservaChat)

module.exports = router;
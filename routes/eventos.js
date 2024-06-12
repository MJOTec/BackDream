const express = require('express')
const router = express.Router()
const EventosControllers = require('../controllers/eventos.js')

router.get('/', EventosControllers.getEventos)

module.exports = router;
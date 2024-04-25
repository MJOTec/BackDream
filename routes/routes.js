const express = require('express')
const router = express.Router()

router.use('/users', require('./users.js'))
router.use('/reserva', require('./reserva.js'))
router.use('/sala', require('./sala.js'))
router.use('/proyecto', require('./proyecto.js'))

module.exports = router;

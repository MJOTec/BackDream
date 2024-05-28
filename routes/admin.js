const express = require('express')
const router = express.Router()
const AdminControllers = require('../controllers/admin.js')

router.get('/reserva-proxima', AdminControllers.getAdminReservasProximas)
router.get('/reserva-actual', AdminControllers.getAdminReservasActuales)

module.exports = router;
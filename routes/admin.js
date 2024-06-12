const express = require('express')
const router = express.Router()
const AdminControllers = require('../controllers/admin.js')

router.get('/reserva-proxima', AdminControllers.getAdminReservasProximas)
router.get('/reserva-actual', AdminControllers.getAdminReservasActuales)
router.get('/dispositivos-reservados-mes', AdminControllers.getAdminDispositivosReservadosMes)
router.get('/dispositivos-reservados-dia', AdminControllers.getAdminDispositivosReservadosDia)
router.get('/dispositivos-reservados-ano', AdminControllers.getAdminDispositivosReservadosAno)
router.get('/salas-reservadas-mes', AdminControllers.getAdminSalasReservadasMes)
router.get('/salas-reservadas-dia', AdminControllers.getAdminSalasReservadasDia)
router.get('/salas-reservadas-ano', AdminControllers.getAdminSalasReservadasAno)
router.get('/todas-salas-reservadas-mes/:ano/:mes', AdminControllers.getAdminTodasSalasReservadasMes)
router.get('/todas-salas-reservadas-ano/:ano', AdminControllers.getAdminTodasSalasReservadasAno)

module.exports = router;
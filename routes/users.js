const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/users.js')

router.get('/', UserControllers.getAllUsers)
router.get("/matriculas", UserControllers.getMatriculas)
/*router.get('/dispositivosala/:nombre_sala', UserControllers.getDispositivoSala)*/

module.exports = router;
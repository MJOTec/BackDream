const express = require('express')
const router = express.Router()
const SalaControllers = require('../controllers/sala.js')

router.get('/', SalaControllers.getAllSalas);
router.get('/dispositivos/:categoria', SalaControllers.getDispositivosSala);


module.exports = router;
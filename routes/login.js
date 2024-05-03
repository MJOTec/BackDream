const express = require('express')
const router = express.Router()
const LoginControllers = require('../controllers/login.js')

router.post('/', LoginControllers.getLogin)

module.exports = router;
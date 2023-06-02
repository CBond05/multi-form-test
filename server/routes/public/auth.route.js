const express = require('express')

const { loginUserCtrl, signupUserCtrl } = require('../../controllers/auth.controller')

const router = express.Router()

router.post('/login', loginUserCtrl)

router.post('/signup', signupUserCtrl)

module.exports = router
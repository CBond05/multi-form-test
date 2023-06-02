// форматирование
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authServices = require("../services/auth.service")

// login a user
const loginUserCtrl = async (req, res) => {
  const { username, password } = req.body
  const { status, response } = await authServices.loginUser(username, password)
  return res.status(status).json(response)
}

// signup a user
const signupUserCtrl = async (req, res) => {
  const { username, password } = req.body

  const { status, response } = await authServices.signupUser(username, password)
  return res.status(status).json(response)
}

module.exports = { loginUserCtrl, signupUserCtrl }

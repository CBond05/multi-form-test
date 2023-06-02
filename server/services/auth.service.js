const express = require('express')

const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (username, password) => {
  try {
    const user = await User.login(username, password)

    const token = createToken(user._id)
    return { status: 200, response: { username, token } }

  } catch (error) {
    const error_response = { error: error.message }
    return { status: 400, response: error_response }
  }
}

const signupUser = async (username, password) => {
  try {
    const user = await User.signup(username, password)
    const token = createToken(user._id)

    return { status: 200, response: { username, token } }

  } catch (error) {
    
    const error_response = { error: error.message }
    return { status: 400, response: error_response }
  }
}

module.exports = {
  loginUser,
  signupUser
}

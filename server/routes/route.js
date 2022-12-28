const express = require('express')
const { hello, addUser, getUsers } = require('./hello')
const { signUpUserAuth, getCurrentUser } = require('./authentication')
const { initialAddUser } = require('./users')

const router = express.Router()

router.get('/hello', hello)

router.post('/add_user', addUser)

router.get('/get_users', getUsers)

router.post('/sign_up_user_auth', signUpUserAuth)

router.get('/get_current_user', getCurrentUser)

router.post('/initially_add_user', initialAddUser)

module.exports = {
  router,
}

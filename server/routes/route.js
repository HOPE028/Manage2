const express = require('express')
const { hello, addUser, getUsers } = require('./hello')
const { signUpUser, getCurrentUser } = require('./authentication')

const router = express.Router()

router.get('/hello', hello)

router.post('/add_user', addUser)

router.get('/get_users', getUsers)

router.post('/sign_up_user', signUpUser)

router.get('/get_current_user', getCurrentUser)

module.exports = {
  router,
}

const express = require('express')
const { hello, addUser, getUsers } = require('./hello')
const { signUpUserAuth, getCurrentUser } = require('./authentication')
const { initialAddUser } = require('./users')
const { returnSpecialFields } = require('./specialFieldInformation')
const { createTeam } = require('./team')

const router = express.Router()

router.get('/hello', hello)

router.post('/add_user', addUser)

router.get('/get_users', getUsers)

router.post('/sign_up_user_auth', signUpUserAuth)

router.get('/get_current_user', getCurrentUser)

router.post('/initially_add_user', initialAddUser)

router.get('/data/specialFields', returnSpecialFields)

router.post('/create_team', createTeam)

module.exports = {
  router,
}

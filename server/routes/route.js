const express = require('express')
const { hello, addUser, getUsers } = require('./helloRoute/hello')

const router = express.Router()

router.get('/hello', hello)

router.post('/add_user', addUser)

router.get('/get_users', getUsers)

module.exports = {
  router,
}

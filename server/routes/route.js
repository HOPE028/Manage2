const express = require('express')
const { hello, addUser } = require('./helloRoute/hello')

const router = express.Router()

router.get('/hello', hello)

router.post('/add_user', addUser)

module.exports = {
  router,
}

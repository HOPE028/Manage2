const express = require('express')
const { hello, addUser, getUsers } = require('./hello')
const {
  signUpUserAuth,
  getCurrentUser,
  signInUserAuth,
} = require('./authentication')
const { initialAddUser, canAccessHome } = require('./users')
const { returnSpecialFields } = require('./specialFieldInformation')
const {
  createTeam,
  getTeamRequiredInfoThroughUserUID,
  postUserInfoThroughUID,
} = require('./team')

const router = express.Router()

router.get('/hello', hello)

router.post('/add_user', addUser)

router.get('/get_users', getUsers)

router.post('/sign_up_user_auth', signUpUserAuth)

router.post('/sign_in_user_auth', signInUserAuth)

router.get('/get_current_user', getCurrentUser)

router.post('/initially_add_user', initialAddUser)

router.get('/data/specialFields', returnSpecialFields)

router.post('/create_team', createTeam)

router.get('/can_access_home', canAccessHome)

router.get(
  '/get_user_requirements_through_uid',
  getTeamRequiredInfoThroughUserUID
)

router.post('/post_user_info_through_uid', postUserInfoThroughUID)

module.exports = {
  router,
}

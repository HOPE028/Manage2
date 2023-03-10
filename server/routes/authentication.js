const { db } = require('../firebase/firebase-config')
const { createUser, currentUserGet, loginUser } = require('../firebase/Auth')

const signUpUserAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body
    await createUser(email, password)
      .then((response) => res.status(200).send({ data: response }))
      .catch((error) => res.status(400).send({ error: error }))
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

const signInUserAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body
    await loginUser(email, password)
      .then((response) => res.status(200).send({ data: response }))
      .catch((error) => res.status(400).send({ error: error }))
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).send({ data: currentUserGet() })
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

module.exports = {
  signUpUserAuth,
  getCurrentUser,
  signInUserAuth,
}

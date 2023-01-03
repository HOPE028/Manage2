const { db } = require('../firebase/firebase-config')
const { createUser, currentUserGet } = require('../firebase/Auth')

const signUpUserAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const response = await createUser(email, password)
      .then((res) => res.status(200).send({ data: res }))
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
}

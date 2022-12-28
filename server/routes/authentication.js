const { db } = require('../firebase/firebase-config')
const { createUser, currentUserGet } = require('../firebase/Auth')
const { collection, addDoc, getDocs } = require('firebase/firestore')

const signUpUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const response = await createUser(email, password)
    res.status(200).send({ resp: response })
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
  signUpUser,
  getCurrentUser,
}

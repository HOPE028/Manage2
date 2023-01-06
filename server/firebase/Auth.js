const { auth } = require('./firebase-config')
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} = require('firebase/auth')

let currentUser

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) =>
    console.log(error)
  )
}

const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).catch((error) =>
    console.log(error)
  )
}

const logOut = () => {
  return signOut(auth).catch((error) => console.log(error))
}

onAuthStateChanged(auth, async (user) => {
  currentUser = user
})

const currentUserGet = () => {
  return currentUser
}

module.exports = {
  loginUser,
  createUser,
  logOut,
  currentUserGet,
  currentUser,
}

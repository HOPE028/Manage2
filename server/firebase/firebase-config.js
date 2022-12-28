const { firebaseConfig } = require('./config')
const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
const { getAuth } = require('firebase/auth')

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

module.exports = {
  app,
  db,
  auth,
}

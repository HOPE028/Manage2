const dotEnv = require('dotenv').config()

const {
  PORT,
  APIKEY,
  APPID,
  AUTHDOMAIN,
  MEASUREMENTID,
  MESSAGINGSENDERID,
  PROJECTID,
  STORAGEBUCKET,
} = process.env

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
}

module.exports = {
  port: PORT,
  firebaseConfig,
}

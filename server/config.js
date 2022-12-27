const dotEnv = require('dotenv')

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

module.exports = {
  port: PORT,
  firebaseConfig: {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
    measurementId: MEASUREMENTID,
  },
}

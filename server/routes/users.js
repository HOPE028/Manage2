const { db } = require('../firebase/firebase-config')
const { createUser, currentUserGet } = require('../firebase/Auth')
const {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
} = require('firebase/firestore')

const initialAddUser = async (req, res, next) => {
  const { email, uid, position, data } = req.body

  if (!email || !uid || !position) {
    res.status(400).send('Insufficient data')
  }

  try {
    const docRef = await setDoc(doc(db, 'Users', uid), {
      email: email,
      position: position,
      data,
    })

    res.status(200).send({
      data: docRef,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

module.exports = {
  initialAddUser,
}

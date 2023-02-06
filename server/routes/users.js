const { db } = require('../firebase/firebase-config')
const {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
} = require('firebase/firestore')
const { currentUserGet } = require('../firebase/Auth')

const initialAddUser = async (req, res, next) => {
  const { email, uid, position, team, data } = req.body

  if (!email || !uid || !position) {
    res.status(400).send('Insufficient data')
    return
  }

  try {
    const docRef = await setDoc(doc(db, 'Users', uid), {
      email: email,
      position: position,
      data: data,
      team: team,
    })

    res.status(200).send({
      data: docRef,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

const canAccessHome = async (req, res) => {
  currentUserData = currentUserGet()

  if (!currentUserData) {
    res.status(400).send({ error: 'Not Signed In' })
    return
  }
}

module.exports = {
  initialAddUser,
  canAccessHome,
}

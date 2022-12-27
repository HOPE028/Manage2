const { db } = require('../../firebase-config')
const { collection, addDoc } = require('firebase/firestore')

const hello = async (req, res, next) => {
  try {
    res.status(200).send({ name: 'HELLO' })
  } catch (error) {
    console.log(error)
  }
}

const addUser = async (req, res, next) => {
  try {
    const docRef = await addDoc(collection(db, 'Users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  hello,
  addUser,
}

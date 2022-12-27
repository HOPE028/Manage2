const { db } = require('../../firebase-config')
const { collection, addDoc } = require('firebase/firestore')

const hello = async (req, res, next) => {
  try {
    res.status(200).send({ name: 'HELLO' })
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

const addUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body

    const docRef = await addDoc(collection(db, 'Users'), {
      first: firstName,
      last: lastName,
    })

    res.status(200).send({
      docRef: docRef.id,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

module.exports = {
  hello,
  addUser,
}

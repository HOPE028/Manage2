const { db } = require('../firebase/firebase-config')
const { collection, addDoc, getDocs } = require('firebase/firestore')

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

const getUsers = async (req, res, next) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Users'))

    let Users = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    res.status(200).send({
      data: Users,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

module.exports = {
  hello,
  addUser,
  getUsers,
}

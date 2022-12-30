const specialFields = [
  {
    name: 'Profile Picture',
    description: 'A profile picture for your account.',
    valueType: 'File',
  },
  {
    name: 'Nickname',
    description: 'A nickname or a name you would prefer',
    valueType: 'String',
  },
  {
    name: 'Biography',
    description: 'A short description of yourself.',
    valueType: 'LongString',
  },
]

const returnSpecialFields = (req, res, next) => {
  try {
    res.status(200).send({
      data: specialFields,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }
}

module.exports = {
  returnSpecialFields,
}

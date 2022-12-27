const hello = async (req, res, next) => {
  try {
    res.status(200).send({ name: 'HELLO' })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  hello,
}

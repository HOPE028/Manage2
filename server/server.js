const express = require('express')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.json())

app.get('/hello', (req, res) => {
  res.status(200).send({
    Hello: 'HELLO',
  })
})

app.listen(4000, () => {
  console.log('WEB app has started at 4000')
})

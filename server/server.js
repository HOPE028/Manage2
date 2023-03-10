const express = require('express')
const cors = require('cors')
const routes = require('./routes/route')

const app = express()

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.json())

app.use('/api', routes.router)

app.listen(4000, () => {
  console.log('WEB app has started at 4000')
})

const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
routes(app)

require('./database')(process.env.TYPE_DATABSE_USAGE || 'production')

app.listen(process.env.PORT || 3000)
console.log(
  `Server running in ${process.env.BASE_URL || 'http://localhost'}:${
    process.env.PORT || 3000
  }`
)

module.exports = app

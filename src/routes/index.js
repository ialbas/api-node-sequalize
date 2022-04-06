const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger.json')
const express = require('express')
const router = express.Router()
const baseRoutes = require('./baseRoutes')

router.use(baseRoutes)

const swaggerUiServer = swaggerUi.serve
const swaggerPage = swaggerUi.setup(swaggerDocument)

router.use('/api/docs', swaggerUiServer)
router.get('/api/docs', swaggerPage)

module.exports = router

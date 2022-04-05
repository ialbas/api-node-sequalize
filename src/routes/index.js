const HandlerHttp = require('./handlerHttp')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger.json')

module.exports = (router) => {
  // Post router
  const {
    HandlerGetByID,
    HandlerGetAll,
    HandlerRemove,
    HandlerCreate,
    HandlerUpdate,
    HandlerLogin,
    authTokenVerify
  } = new HandlerHttp()

  // Route Post With Authorization
  router.post('/api/posts', authTokenVerify, HandlerCreate)
  router.get('/api/posts', authTokenVerify, HandlerGetAll)
  router.get('/api/posts/:id', authTokenVerify, HandlerGetByID)
  router.put('/api/posts/:id', authTokenVerify, HandlerUpdate)
  router.delete('/api/posts/:id', authTokenVerify, HandlerRemove)

  // Route Auth Open
  router.post('/api/auth/login', HandlerLogin)

  /*
  * Routes
  * Swagger Documentation Routes
  * Server Swagger Documentation swaggerUiServer, swaggerPage
  */
  const swaggerUiServer = swaggerUi.serve
  const swaggerPage = swaggerUi.setup(swaggerDocument)

  router.use('/api/docs', swaggerUiServer)
  router.get('/api/docs', swaggerPage)
}

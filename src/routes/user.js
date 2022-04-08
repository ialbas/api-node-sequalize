const express = require('express')
const User = require('../controllers/user')
const authorize = require('../middlewares/authorize')

const UserController = new User()

const router = express.Router()

router.get('/api/users', authorize, async (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = 'Get All EndPoint
      #swagger.parameters[page] = {
            in: 'query',
            type: 'integer',
            description: 'Required number of page',
            required: true
      }
      #swagger.parameters[size] = {
            in: 'query',
            type: 'integer',
            description: 'Required number of size',
            required: true
      }
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await UserController.getAll(
    req.query.page,
    req.query.size
  )
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.post('/api/users', authorize, async (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = Create
      #swagger.produces = ['application/json']
      #swagger.requestBody = {
           required: true,
            description: 'Create a new user',
            content: {
             "application/json": {
                    schema: {
                        $ref: "#/definitions/AddUser"
                    }
             }
            }
      }
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await UserController.create(req.body)
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.get('/api/users/:id', authorize, async (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = 'Get By ID EndPoint
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await UserController.getById(req.params.id)
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.get('/api/users-email/:email', authorize, async (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = 'Get By User Email EndPoint
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await UserController.getUserByEmail(req.params.email)
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.put('/api/users/:id', authorize, async (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = 'Update EndPoint
      #swagger.requestBody = {
           required: true,
            description: 'Update a user',
            content: {
                "application/json": {
                        schema: {
                            $ref: "#/definitions/UpdateUser"
                        }
                }
            }
      }
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await UserController.update(req.params.id, req.body)
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.put('/api/users-change-password/:email', authorize, async (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = 'Update User Password
      #swagger.requestBody = {
           required: true,
            description: 'Update a user password',
            content: {
                "application/json": {
                        schema: {
                            $ref: "#/definitions/UserChangePassword"
                        }
                }
            }
      }
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await UserController.changePassword(req.params.email, req.body)
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.delete('/api/users/:id', authorize, async (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = 'Remove EndPoint
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */

  const httpResponse = await UserController.remove(req.params.id)
  res.status(httpResponse.statusCode).json(httpResponse)
})

module.exports = router

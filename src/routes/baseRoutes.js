
const express = require('express')
const authorize = require('../middlewares/authorize')
const Post = require('../controllers/post')
const Auth = require('../controllers/auth')

// Post Routes
const PostController = new Post()
const AuthController = new Auth()

const router = express.Router()

// Open routes
router.post('/api/auth/login', async (req, res) => {
  /*
      #swagger.tags = ['Login']
      #swagger.description = 'Login EndPoint
       #swagger.requestBody = {
           required: true,
            description: 'Signin',
            content: {
                "application/json": {
                        schema: {
                            $ref: "#/definitions/Login"
                        }
                }
            }
      }

  */
  const httpResponse = await AuthController.auth(

    req.body.email,
    req.body.password
  )

  res.status(httpResponse.statusCode).json(httpResponse)
})

// Close routes
router.get('/api/posts', authorize, async (req, res) => {
  /*
      #swagger.tags = ['Post']
      #swagger.description = 'Get All EndPoint
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await PostController.getAll(
    req.query.page,
    req.query.size
  )
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.post('/api/posts', authorize, async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  /*
      #swagger.tags = ['Post']
      #swagger.description = 'Create EndPoint
      #swagger.produces = ['application/json']
      #swagger.requestBody = {
           required: true,
            description: 'Create a new post',
            content: {
             "application/json": {
                    schema: {
                        $ref: "#/definitions/AddPost"
                    }
             }
            }
      }
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await PostController.create(req.body)
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.get('/api/posts/:id', authorize, async (req, res) => {
  /*
      #swagger.tags = ['Post']
      #swagger.description = 'Get By ID EndPoint
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await PostController.getById(req.params.id)
  res.status(httpResponse.statusCode).json(httpResponse)
})

router.put('/api/posts/:id', authorize, async (req, res) => {
  /*
      #swagger.tags = ['Post']
      #swagger.description = 'Update EndPoint
      #swagger.requestBody = {
           required: true,
            description: 'Update a post',
            content: {
                "application/json": {
                        schema: {
                            $ref: "#/definitions/AddPost"
                        }
                }
            }
      }
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */
  const httpResponse = await PostController.update(req.params.id, req.body)
  res.status(httpResponse.statusCode).json(httpResponse)
})
router.delete('/api/posts/:id', authorize, async (req, res) => {
  /*
      #swagger.tags = ['Post']
      #swagger.description = 'Remove EndPoint
      #swagger.security = [{
      "apiKeyAuth": []
    }]
  */

  const httpResponse = await PostController.remove(req.params.id)
  res.status(httpResponse.statusCode).json(httpResponse)
})

module.exports = router

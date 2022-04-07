const express = require('express')
const Auth = require('../controllers/auth')

const AuthController = new Auth()

const router = express.Router()

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

module.exports = router

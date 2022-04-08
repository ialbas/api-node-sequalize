require('dotenv').config()

const doc = {
  info: {
    version: process.env.APP_VERSION,
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION
  },
  host: process.env.APP_HOST_SWAGGER,
  basePath: '/',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Login',
      description: 'Login endpoit of the application',
      externalDocs: {
        description: 'More details',
        url: 'https://github.com/ialbas/api-node-sequalize'
      }
    },
    {
      name: 'Post',
      description: 'Principal endpoits of the application',
      externalDocs: {
        description: 'More details',
        url: 'https://github.com/ialbas/api-node-sequalize'
      }
    },
    {
      name: 'User',
      description: 'Users endpoits of the application',
      externalDocs: {
        description: 'More details',
        url: 'https://github.com/ialbas/api-node-sequalize'
      }
    }
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be "header", "query" or "cookie"
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Please write the word Bearer before correcly token.'
    }
  },
  definitions: {
    Post: {
      id: 'fea2ce02-4417-4453-83d6-a919990610a8',
      title: 'any_title',
      description: 'any_valid_description',
      tags: ['valid_one', 'valid_two']
    },
    User: {
      id: 'fea2ce02-4417-4453-83d6-a919990610a8',
      name: 'any_email',
      email: 'any_email@mail.com',
      password: 'any_password',
      roles: ['valid_one', 'valid_two']
    },
    AddPost: {
      title: 'any_title',
      description: 'any_valid_description',
      tags: ['valid_one', 'valid_two']
    },
    AddUser: {
      name: 'any_email',
      email: 'any_email@mail.com',
      password: 'any_password',
      roles: ['valid_one', 'valid_two']
    },
    UpdateUser: {
      name: 'any_email',
      roles: ['valid_one', 'valid_two']
    },
    UserChangePassword: {
      oldPassword: 'your_old_password',
      newPassword: 'any_new_password'
    },
    Login: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
}

const outputFile = './src/docs/swagger.json'
const endpointsFiles = ['./src/routes/appRoutes.js']

const options = {
  openapi: '3.0.0'

}

const swaggerAutogen = require('swagger-autogen')(options)

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js')
})

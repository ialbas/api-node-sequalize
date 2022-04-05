require('dotenv').config()
const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: process.env.APP_VERSION,
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION
  },
  host: process.env.APP_HOST_SWAGGER,
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Post',
      description: 'Endpoints',
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
      name: 'X-API-KEY', // name of the header, query parameter or cookie
      description: 'any description...'
    }
  },
  definitions: {

  }
}

const outputFile = './src/docs/swagger.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js')
})

const MissingParamError = require('./missing-param-error')
const UnauthorizedError = require('./unauthorized-error')
const ResourceNotFound = require('./resource-not-found')
const ServerError = require('./server-error')
const GenericMessageError = require('./generic-message-error')

module.exports = class HttpResponse {
  static serverError (paramName) {
    return {
      statusCode: 500,
      description: 'internal server error',
      error: new ServerError(paramName)
    }
  }

  static notFound (paramName) {
    return {
      statusCode: 404,
      description: 'not found',
      error: new ResourceNotFound(paramName)
    }
  }

  static unauthorized (paramName) {
    return {
      statusCode: 401,
      description: 'unauthorized',
      error: new UnauthorizedError(paramName)
    }
  }

  static badRequest (paramName) {
    return {
      statusCode: 400,
      description: 'bad request',
      error: new MissingParamError(paramName)
    }
  }

  static badRequestGenericParam (paramName) {
    return {
      statusCode: 400,
      description: 'bad request',
      error: new GenericMessageError(paramName)
    }
  }

  static ok (data) {
    return {
      statusCode: 200,
      description: 'ok',
      data
    }
  }

  static created (data) {
    return {
      statusCode: 201,
      description: 'created',
      data
    }
  }

  static noContent () {
    return {
      statusCode: 204,
      description: 'no content'
    }
  }
}

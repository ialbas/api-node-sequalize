require('dotenv').config()
const HttpResponse = require('../../helpers/http-response')
const Encripter = require('../../helpers/encrypter')
const TokenHelper = require('../../helpers/token-helper')
const User = require('../../service/User')

class AuthRouter {
  async auth (email, password) {
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
    const usr = new User()
    const result = await usr.getUserByEmail(email)

    const encripter = new Encripter()
    const isValid = result.data && (await encripter.compare(password, result.data.password))
    if (isValid) {
      const tokenHelper = new TokenHelper(process.env.TOKEN_SECRET)
      const accessToken = await tokenHelper.generate(result.data.id)
      return HttpResponse.ok({ accessToken: accessToken })
    }
    return HttpResponse.unauthorized('user unauthorized.')
  }
}

module.exports = AuthRouter

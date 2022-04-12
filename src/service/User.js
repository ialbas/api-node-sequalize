const bcrypt = require('bcrypt')
const UserModel = require('../database/models/User')
const validator = require('validator')
const HttpResponse = require('../helpers/http-response')
const genericValidation = require('./genericValidation')
const Encripter = require('../helpers/encrypter')

class User {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  async create (user) {
    if (Object.keys(user).length <= 0) {
      return HttpResponse.badRequest('body no provided')
    }

    if (!user.password) {
      return HttpResponse.badRequest('password is required')
    }
    if (!user.email) {
      return HttpResponse.badRequest('email is required')
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
    const emailExist = await this.getUserByEmail(user.email)

    if (emailExist.statusCode === 200) {
      return HttpResponse.badRequestGenericParam('email already exist')
    }

    const validate = await genericValidation(user, UserModel)
    if (!validate.isValid) {
      return HttpResponse.badRequestGenericParam(validate.errors)
    }

    try {
      const result = await UserModel.create(user)

      return HttpResponse.created({
        id: result.id,
        name: result.name,
        email: result.email,
        roles: JSON.parse(result.roles),
        created_at: result.createdAt,
        updated_at: result.updatedAt
      })
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }

  async update (id, user) {
    if (Object.keys(user).length <= 0) {
      return HttpResponse.badRequest('body no provided')
    }

    if (!validator.isUUID(id)) {
      return HttpResponse.badRequest('id no has valid UUID')
    }
    user.password = 'any_password'
    const validate = await genericValidation(user, UserModel)
    if (!validate.isValid) {
      return HttpResponse.badRequestGenericParam(validate.errors)
    }

    try {
      const find = await UserModel.findByPk(id)
      if (!find) {
        return HttpResponse.notFound(`the resource '${id}' not found`)
      }

      const where = { where: { id } }
      const findOne = await UserModel.findOne(where)

      if (user.name) findOne.name = user.name
      if (user.roles) findOne.roles = user.roles
      if (find.email) findOne.email = find.email
      if (find.password) findOne.password = find.password

      const nObj = {
        name: findOne.name,
        email: findOne.email,
        roles: !user.roles ? JSON.parse(findOne.roles) : user.roles,
        password: findOne.password
      }

      const validate = await genericValidation(nObj, UserModel)
      if (!validate.isValid) {
        return HttpResponse.badRequestGenericParam(validate.errors)
      }

      const result = await findOne.save()
      return HttpResponse.ok({
        id: result.id,
        name: result.name,
        email: result.email,
        roles: !user.roles ? JSON.parse(result.roles) : result.roles,
        created_at: result.createdAt,
        updated_at: result.updatedAt
      })
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }

  async changePassord (email, body) {
    if (Object.keys(body).length <= 0) {
      return HttpResponse.badRequest('body no provided')
    }

    if (!validator.isEmail(email)) {
      return HttpResponse.badRequest('email no has valid')
    }

    if (!body.newPassword) {
      return HttpResponse.badRequest('newPassword')
    }

    if (!body.oldPassword) {
      return HttpResponse.badRequest('oldPassword')
    }

    try {
      const find = await UserModel.findOne({ where: { email: email } })

      if (!find) {
        return HttpResponse.notFound(`the resource '${email}' not found`)
      }

      const encripter = new Encripter()
      const isValid = await encripter.compare(body.oldPassword, find.dataValues.password)
      if (!isValid) {
        return HttpResponse.badRequestGenericParam('the password has no match')
      }

      if (isValid) {
        const newPassword = await bcrypt.hash(body.newPassword, 10)

        const nObj = {
          name: find.dataValues.name + ' save',
          email: find.dataValues.email,
          password: newPassword,
          roles: JSON.parse(find.dataValues.roles)
        }

        find.set(nObj)
        const result = await find.save()

        return HttpResponse.ok({
          id: result.id,
          name: result.name,
          email: result.email,
          password: result.password,
          updated_at: result.updatedAt
        })
      }
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }

  async getById (id) {
    if (!validator.isUUID(id)) {
      return HttpResponse.badRequest('id no has valid UUID')
    }
    try {
      const result = await UserModel.findByPk(id)
      if (result) {
        return HttpResponse.ok({
          id: result.id,
          name: result.name,
          email: result.email,
          roles: JSON.parse(result.roles),
          created_at: result.createdAt,
          updated_at: result.updatedAt
        })
      }
      return HttpResponse.notFound(`the resource '${id}' not found`)
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }

  async getUserByEmail (email) {
    if (!validator.isEmail(email)) {
      return HttpResponse.badRequest('email no has valid')
    }
    try {
      const result = await UserModel.findOne({ where: { email: email } })
      if (result) {
        return HttpResponse.ok({
          id: result.id,
          name: result.name,
          email: result.email,
          password: result.password,
          roles: JSON.parse(result.roles),
          created_at: result.createdAt,
          updated_at: result.updatedAt
        })
      }
      return HttpResponse.notFound(`the resource '${email}' not found`)
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }

  async remove (id) {
    if (!validator.isUUID(id)) {
      return HttpResponse.badRequest('id no has valid UUID')
    }
    try {
      const find = await UserModel.findByPk(id)
      if (find) {
        const remove = await UserModel.destroy({ where: { id: id } })

        if (remove) {
          return HttpResponse.noContent(remove)
        }
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }

  async getAll (page, size) {
    try {
      const offset = size * (parseInt(page) - 1)
      const options = {
        offset,
        limit: parseInt(size),
        raw: true,
        attributes: ['id', 'name', 'email', 'roles', ['createdAt', 'created_at'], ['updatedAt', 'updated_at']],
        order: [
          ['createdAt', 'DESC']
        ]
      }

      const result = await UserModel.findAndCountAll(options)
      if (result.rows.length === 0) {
        return HttpResponse.ok({
          rows: result.rows,
          total: result.count,
          limit: options.limit,
          offset: options.offset
        })
      }

      if (result.rows.length > 0) {
        return HttpResponse.ok({
          rows: result.rows.map(data => {
            if (data.roles) {
              data.roles = JSON.parse(data.roles)
            }
            return data
          }),
          total: result.count,
          limit: options.limit,
          offset: options.offset
        })
      }
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }
}

module.exports = User

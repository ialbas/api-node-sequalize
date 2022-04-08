const User = require('../../service/User')
const HttpResponse = require('../../helpers/http-response')

class UserRouter {
  /**
   * @name User.create
   * @api {user} /api/users
   * @description Create a new user
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer { id: UUID, name: string, email:string, password:string, roles: string[] }
   */
  async create (body) {
    const service = new User()
    const result = await service.create(body)
    return result
  }

  /**
   * @name User.update
   * @api {put} /api/users/:id
   * @description Update a user by id
   * @param {string} id a valid UUID version 4
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer {{ id: UUID, name: string, email:string, password:string, roles: string[] }}
   */
  async update (id, body) {
    if (!id) {
      return HttpResponse.badRequest('id')
    }
    const service = new User()
    const result = await service.update(id, body)
    return result
  }

  /**
   * @name User.changePassord
   * @api {put} /api/users/:email
   * @description Update a user by email
   * @param {string} email a valid
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer {{ id: UUID, name: string, email: string, roles: string[] }}
   */
  async changePassword (email, body) {
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    const service = new User()
    const result = await service.changePassord(email, body)
    return result
  }

  /**
   * @name User.getByID
   * @api {get} /api/users/:id
   * @description Get user by ID
   * @param {string} id UUID version 4
   * @returns {object} {{ id: UUID, name: string, email: string, roles: string[] }}
   */
  async getById (id) {
    if (!id) {
      return HttpResponse.badRequest('id')
    }
    const service = new User()
    const result = await service.getById(id)
    return result
  }

  /**
   * @name User.getUserByEmail
   * @api {get} /api/users/:email
   * @description Get user by email
   * @param {string} email
   * @returns {object} {{ id: UUID, name: string, email:string, password:string, roles: string[] }}
   */
  async getUserByEmail (email) {
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    const service = new User()
    const result = await service.getUserByEmail(email)
    return result
  }

  /**
   * @name User.getAll
   * @api {get} /api/users?page=1&size=5
   * @description Get all User with pagination
   * @param {string} page
   * @param {string} size
   * @returns list of User [{ id: UUID, name: string, email:string, password:string, roles: string[] }]
   */
  async getAll (page, size) {
    if (!page && !size) {
      return HttpResponse.serverError()
    }
    if (!page && size) {
      return HttpResponse.badRequest('page')
    }
    if (page && !size) {
      return HttpResponse.badRequest('size')
    }
    if (!parseInt(page) > 0) {
      return HttpResponse.badRequest('page')
    }
    if (!parseInt(size) > 0) {
      return HttpResponse.badRequest('size')
    }
    const service = new User()
    const result = await service.getAll(page, size)
    return result
  }

  /**
   * @name User.remove
   * @api {delete} /api/users/:id
   * @description Remove a user by ID
   * @param {string} id a valid UUID verion 4
   * @returns no content after remove a user
   */
  async remove (id) {
    if (!id) {
      return HttpResponse.badRequest('id')
    }
    const service = new User()
    const result = await service.remove(id)
    return result
  }
}
module.exports = UserRouter

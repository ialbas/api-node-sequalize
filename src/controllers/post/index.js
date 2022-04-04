const validator = require('validator')

const Post = require('../../service/Post')
const HttpResponse = require('../../helpers/http-response')

class PostRouter {
  /**
   * @name Post.create
   * @api {post} /api/post
   * @description Create a new post
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer { id: UUID, title: string, body: string, tags: string[] }
   */
  async create (body) {
    const service = new Post()
    const result = await service.create(body)
    return result
  }

  /**
   * @name Post.update
   * @api {put} /api/post/:id
   * @description Update a post by id
   * @param {string} id a valid UUID version 4
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer {{ id: UUID, title: string, body: string, tags: string[] }}
   */
  async update (id, body) {
    if (!id) {
      return HttpResponse.badRequest('id')
    }
    const service = new Post()
    const result = await service.update(id, body)
    return result
  }

  /**
   * @name Post.getByID
   * @api {get} /api/post/:id
   * @description Get post by ID
   * @param {string} id UUID version 4
   * @returns {object} {{ id: UUID, title: string, body: string, tags: string[] }}
   */
  async getById (id) {
    if (!id) {
      return HttpResponse.badRequest('id')
    }
    const service = new Post()
    const result = await service.getById(id)
    return result
  }

  /**
   * @name Post.getAll
   * @api {get} /api/post?page=1&size=5
   * @description Get all Post with pagination
   * @param {string} page
   * @param {string} size
   * @returns list of Post [{ id: UUID, title: string, body: string, tags: string[] }]
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
    const service = new Post()
    const result = await service.getAll(page, size)
    return result
  }

  /**
   * @name Post.remove
   * @api {delete} /api/post/:id
   * @description Remove a post by ID
   * @param {string} id a valid UUID verion 4
   * @returns no content after remove a post
   */
  async remove (id) {
    if (!id) {
      return HttpResponse.badRequest('id')
    }
    const service = new Post()
    const result = await service.remove(id)
    return result
  }
}
module.exports = PostRouter

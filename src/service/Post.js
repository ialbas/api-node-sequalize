const PostModel = require('../database/models/Post')
const validator = require('validator')
const HttpResponse = require('../helpers/http-response')
const genericValidation = require('./genericValidation')

class Post {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  async create (post) {
    if (Object.keys(post).length <= 0) {
      return HttpResponse.badRequest('body no provided')
    }

    const validate = await genericValidation(post, PostModel)
    if (!validate.isValid) {
      return HttpResponse.badRequestGenericParam(validate.errors)
    }

    try {
      const result = await PostModel.create(post)

      return HttpResponse.created({
        id: result.id,
        title: result.title,
        description: result.description,
        tags: JSON.parse(result.tags),
        created_at: result.createdAt,
        updated_at: result.updatedAt
      })
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }

  async update (id, post) {
    if (Object.keys(post).length <= 0) {
      return HttpResponse.badRequest('body no provided')
    }

    if (!validator.isUUID(id)) {
      return HttpResponse.badRequest('id no has valid UUID')
    }
    const validate = await genericValidation(post, PostModel)
    if (!validate.isValid) {
      return HttpResponse.badRequestGenericParam(validate.errors)
    }

    try {
      const find = await PostModel.findByPk(id)
      if (!find) {
        return HttpResponse.notFound(`the resource '${id}' not found`)
      }
      const result = await PostModel.create(post)
      return HttpResponse.ok({
        id: result.id,
        title: result.title,
        description: result.description,
        tags: JSON.parse(result.tags),
        created_at: result.createdAt,
        updated_at: result.updatedAt
      })
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
      const result = await PostModel.findByPk(id)
      if (result) {
        return HttpResponse.ok({
          id: result.id,
          title: result.title,
          description: result.description,
          tags: JSON.parse(result.tags),
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

  async remove (id) {
    if (!validator.isUUID(id)) {
      return HttpResponse.badRequest('id no has valid UUID')
    }
    try {
      const find = await PostModel.findByPk(id)
      if (find) {
        const remove = await PostModel.destroy({ where: { id: id } })

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
        attributes: ['id', 'title', 'description', 'tags', ['createdAt', 'created_at'], ['updatedAt', 'updated_at']],
        order: [
          ['createdAt', 'DESC']
        ]
      }

      const result = await PostModel.findAndCountAll(options)
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
            if (data.tags) {
              data.tags = JSON.parse(data.tags)
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

module.exports = Post

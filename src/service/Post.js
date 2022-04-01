const PostModel = require('../database/models/Post')
const HttpResponse = require('../helpers/http-response')
const isValid = require('./postValidation')

class Post {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  async create (post) {
    if (Object.keys(post).length <= 0) {
      return HttpResponse.badRequest('body no provided')
    }

    const validate = await isValid(post)
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
    }
  }

  async update (id, post) {
    if (!id) {
      return HttpResponse.badRequest('id')
    }

    if (Object.keys(post).length <= 0) {
      return HttpResponse.badRequest('body no provided')
    }

    const validate = await isValid(post)
    if (!validate.isValid) {
      return HttpResponse.badRequestGenericParam(validate.errors)
    }

    try {
      const find = await PostModel.findByPk(id)

      if (find) {
        const result = await PostModel.create(post)

        return HttpResponse.created({
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
    }
  }

  async getById (id) {
    try {
      const find = await PostModel.findOne({ _id: id })
      if (find) {
        return HttpResponse.ok(find)
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
    }
  }

  async remove (id) {
    try {
      const find = await PostModel.findOne({ _id: id })
      if (find) {
        const remove = await PostModel.deleteOne({ _id: id })

        if (remove) {
          return HttpResponse.ok(remove)
        }
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
    }
  }

  async getAll (page, size) {
    try {
      const offset = size * (page - 1)
      const options = {
        sort: { date: -1 },
        select: 'title body tags',
        lean: false,
        offset,
        limit: size
      }

      const result = await PostModel.paginate(
        {},
        options,
        async (_err, res) => {
          return await res
        }
      )
      if (result.docs.length > 0) {
        return HttpResponse.ok(result)
      }

      return HttpResponse.notFound('page or size')
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = Post

const PostRouter = require('../../src/controllers/post/index')
const httpRequest = require('./httpRequest.json')

describe('PostUseCase - CREATE POST CORRECLY', () => {
  beforeAll(async () => {
    require('../../src/database')('production')
  })
  afterAll(async () => {
    require('../../src/database')('production').close()
  })
  let defaulReturn
  let id
  test('Should return Missing param and status 400 if `body` no provided, in route `create`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.create(httpRequest.empty)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: body no provided')
  })
  test('Should return bad request and status 400 if `description` no provided, in route `create`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.create(httpRequest['--description'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('notNull Violation: `description` is required')
  })
  test('Should return bad request and status 400 if `title` no provided, in route `create`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.create(httpRequest['--title'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('notNull Violation: `title` is required')
  })
  test('Should return bad request and status 400 if `description` is null or not in between 10 and 100 characters long, in route `create`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.create(httpRequest['short-description'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: description has to be between 10 and 100 characters long')
  })
  test('Should return bad request and status 400 if `title` is null or not in between 5 and 10 characters long, in route `create`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.create(httpRequest['short-title'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: title has to be between 5 and 10 characters long')
  })
  test('Should return bad request and status 400 if `description` is null or not in between 10 and 100 characters long, in route `create`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.create(httpRequest['long-description'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: description has to be between 10 and 100 characters long')
  })
  test('Should return bad request and status 400 if `title` is null or not in between 5 and 10 characters long, in route `create`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.create(httpRequest['long-title'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: title has to be between 5 and 10 characters long')
  })

  test('Should return bad request and status 400 if there is a `invalid_tag`, in route `create`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.create(httpRequest['invalid-tag'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('There are  any invalid tag')
  })
  test('Should return bad request and status 400 if `tag` there is `malformed`, in route `create`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.create(httpRequest['malformed-tag'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: the field `tags` has malformed, only array is allowed')
  })
  test('Should return bad request and status 201 if all tags are `valid`, in route `create`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      title: 'normal',
      description: 'long description',
      tags: [
        'valid_tag_one',
        'valid_tag_two',
        'valid_tag_three'
      ]
    }
    const httpResponse = await sut.create(httpRequest)
    defaulReturn = httpResponse.data
    id = defaulReturn.id
    expect(httpResponse.statusCode).toBe(201)
  })
  test('Should return Missing param and status 400 if `body` no provided, in route `update`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.update(id, httpRequest.empty)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: body no provided')
  })
  test('Should return bad request and status 400 if `description` no provided, in route `update`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.update(id, httpRequest['--description'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('notNull Violation: `description` is required')
  })
  test('Should return bad request and status 400 if `title` no provided, in route `update`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.update(id, httpRequest['--title'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('notNull Violation: `title` is required')
  })
  test('Should return bad request and status 400 if `description` is null or not in between 10 and 100 characters long, in route `update`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.update(id, httpRequest['short-description'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: description has to be between 10 and 100 characters long')
  })
  test('Should return bad request and status 400 if `title` is null or not in between 5 and 10 characters long, in route `update`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.update(id, httpRequest['short-title'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: title has to be between 5 and 10 characters long')
  })
  test('Should return bad request and status 400 if `description` is null or not in between 10 and 100 characters long, in route `update`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.update(id, httpRequest['long-description'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: description has to be between 10 and 100 characters long')
  })
  test('Should return bad request and status 400 if `title` is null or not in between 5 and 10 characters long, in route `update`', async () => {
    const sut = new PostRouter()

    const httpResponse = await sut.update(id, httpRequest['long-title'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: title has to be between 5 and 10 characters long')
  })

  test('Should return bad request and status 400 if there is a `invalid_tag`, in route `update`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.update(id, httpRequest['invalid-tag'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('There are  any invalid tag')
  })
  test('Should return bad request and status 400 if `tag` there is `malformed`, in route `update`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.update(id, httpRequest['malformed-tag'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: the field `tags` has malformed, only array is allowed')
  })
  test('Should return bad request and status 400 if not exists, in route `update`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.update(null, httpRequest['malformed-tag'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id')
  })
  test('Should return bad request and status 400 if ID UUDI is no valid, in route `update`', async () => {
    const sut = new PostRouter()
    const id = 'any_id'
    const httpResponse = await sut.update(id, httpRequest['valid-tag'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id no has valid UUID')
  })

  test('Should return not found and status 404 if not exists, in route `update`', async () => {
    const sut = new PostRouter()
    const id = '3ea9c08d-824c-4bdf-995f-1456ed103a7a'
    const httpResponse = await sut.update(id, httpRequest['valid-tag'])
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.error.name).toContain(`the resource '${id}' not found`)
  })
  test('Should return bad request and status 200 if all tags and id are `valid`, in route `update`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      title: 'update',
      description: 'long description update',
      tags: [
        'valid_tag_one',
        'valid_tag_two',
        'valid_tag_three'
      ]
    }
    const httpResponse = await sut.update(id, httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
  test('Should return bad request and status 400 if ID UUDI is no valid, in route `getById`', async () => {
    const sut = new PostRouter()
    const id = 'any_id'
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id no has valid UUID')
  })
  test('Should return bad request and status 400 if ID UUDI is null, in route `getById`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getById(null)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id')
  })
  test('Should return bad request and status 200 if ID UUDI is valid, in route `getById`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(200)
  })
  test('Should return bad request and status 400 if ID UUDI is no valid, in route `remove`', async () => {
    const sut = new PostRouter()
    const id = 'any_id'
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id no has valid UUID')
  })
  test('Should return bad request and status 400 if ID UUDI is null, in route `remove`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.remove(null)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id')
  })
  test('Should return bad request and status 200 if ID UUDI is valid, in route `remove`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.remove(id)
    console.log(httpResponse)
    expect(httpResponse.statusCode).toBe(204)
  })
})

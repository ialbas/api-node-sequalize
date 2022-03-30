const PostRouter = require('../../src/controllers/post/index')
const httpRequest = require('./httpRequest.json')

describe('PostUseCase - CREATE POST CORRECLY', () => {
  beforeAll(async () => {
    require('../../src/database')('test')
  })
  afterAll(async () => {
    require('../../src/database')('test').close()
  })
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
    const httpResponse = await sut.create(httpRequest['valid-tag'])
    expect(httpResponse.statusCode).toBe(201)
  })
})

const UserRouter = require('../../src/controllers/user/index')
const httpRequest = require('./httpRequest.json')
const { faker } = require('@faker-js/faker')

describe('UserUseCase - CREATE POST CORRECLY', () => {
  let connect = null
  let sequelize
  const dbType = 'development'
  beforeAll(async () => {
    sequelize = require('../../src/database')(dbType)
    try {
      await sequelize.authenticate()
      connect = true
    } catch (error) {
      connect = false
      console.error('Unable to connect to the database.')
    }
  })
  afterAll(async () => {
    require('../../src/database')(dbType).close()
  })
  let defaulReturn
  let id
  test('Should return Missing param and status 400 if `body` no provided, in route `create`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.create(httpRequest.empty)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: body no provided')
  })
  test('Should return bad request and status 400 if `email` no provided, in route `create`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.create(httpRequest['--email'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: email is required')
  })
  test('Should return bad request and status 400 if `password` no provided, in route `create`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.create(httpRequest['--password'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: password is required')
  })
  test('Should return bad request and status 400 if `name` no provided, in route `create`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.create(httpRequest['--name'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('notNull Violation: `name` is required')
  })

  test('Should return bad request and status 400 if `name` is null or not in between 5 and 10 characters long, in route `create`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.create(httpRequest['short-name'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: name has to be between 4 and 100 characters long')
  })
  test('Should return bad request and status 400 if `email` is null or not in between 10 and 100 characters long, in route `create`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.create(httpRequest['long-email'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: email has to be between 6 and 100 characters long')
  })
  test('Should return bad request and status 400 if `name` is null or not in between 5 and 10 characters long, in route `create`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.create(httpRequest['long-name'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: name has to be between 4 and 100 characters long')
  })

  test('Should return bad request and status 400 if there is a `invalid_role`, in route `create`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.create(httpRequest['invalid-role'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('There are  any invalid role')
  })
  test('Should return bad request and status 400 if `role` there is `malformed`, in route `create`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.create(httpRequest['malformed-role'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Validation error: the field `roles` has malformed, only array is allowed')
  })
  test('Should return bad request and status 201 if all roles are `valid`, in route `create`', async () => {
    const sut = new UserRouter()
    const httpRequest = {
      name: 'normal',
      email: faker.internet.email(),
      password: 'any_hashed_passowrd',
      roles: [
        'valid_role_one',
        'valid_role_two',
        'valid_role_three'
      ]
    }
    const httpResponse = await sut.create(httpRequest)
    if (connect) {
      defaulReturn = httpResponse.data
      id = httpResponse.data.id
      expect(httpResponse.statusCode).toBe(201)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })
  test('Should return bad request and status 400 if `email` already exists, in route `create`', async () => {
    const sut = new UserRouter()
    let httpRequest
    if (connect) {
      httpRequest = {
        name: 'normal',
        email: defaulReturn.email,
        password: 'any_hashed_passowrd',
        roles: [
          'valid_role_one',
          'valid_role_two',
          'valid_role_three'
        ]
      }
      const httpResponse = await sut.create(httpRequest)

      expect(httpResponse.statusCode).toBe(400)
      expect(httpResponse.error.name).toBe('email already exist')
    }
  })
  test('Should return Missing param and status 400 if `body` no provided, in route `update`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.update(id, httpRequest.empty)
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('Missing param: body no provided')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if `email` no provided, in route `update`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.update(id, httpRequest['--email'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('notNull Violation: `email` is required')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if `name` no provided, in route `update`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.update(id, httpRequest['--name'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('notNull Violation: `name` is required')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if `email` is null or not in between 10 and 100 characters long, in route `update`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.update(id, httpRequest['short-email'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('Validation error: email has to be between 6 and 100 characters long')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if `name` is null or not in between 5 and 100 characters long, in route `update`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.update(id, httpRequest['short-name'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('Validation error: name has to be between 4 and 100 characters long')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if `email` is null or not in between 6 and 100 characters long, in route `update`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.update(id, httpRequest['long-email'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('Validation error: email has to be between 6 and 100 characters long')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if `name` is null or not in between 4 and 100 characters long, in route `update`', async () => {
    const sut = new UserRouter()

    const httpResponse = await sut.update(id, httpRequest['long-name'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('Validation error: name has to be between 4 and 100 characters long')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })

  test('Should return bad request and status 400 if there is a `invalid_role`, in route `update`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.update(id, httpRequest['invalid-role'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('There are  any invalid role')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if `role` there is `malformed`, in route `update`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.update(id, httpRequest['malformed-role'])
    expect(httpResponse.statusCode).toBe(400)
    if (connect) {
      expect(httpResponse.error.name).toContain('Validation error: the field `roles` has malformed, only array is allowed')
    } else {
      expect(httpResponse.error.name).toContain('Missing param: id')
    }
  })
  test('Should return bad request and status 400 if not exists, in route `update`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.update(null, httpRequest['malformed-role'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id')
  })
  test('Should return bad request and status 400 if ID UUDI is no valid, in route `update`', async () => {
    const sut = new UserRouter()
    const id = 'any_id'
    const httpResponse = await sut.update(id, httpRequest['valid-role'])
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id no has valid UUID')
  })

  test('Should return not found and status 404 if not exists, in route `update`', async () => {
    const sut = new UserRouter()
    const id = '3ea9c08d-824c-4bdf-995f-1456ed103a7a'
    const httpResponse = await sut.update(id, httpRequest['valid-role'])
    if (connect) {
      expect(httpResponse.statusCode).toBe(404)
      expect(httpResponse.error.name).toContain(`the resource '${id}' not found`)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })
  test('Should return (if has connect) bad request and status 200 if all roles and id are `valid`, in route `update`', async () => {
    const sut = new UserRouter()
    const httpRequest = {
      name: 'update',
      email: faker.internet.email(),
      roles: [
        'valid_role_one',
        'valid_role_two',
        'valid_role_three'
      ]
    }
    const httpResponse = await sut.update(id, httpRequest)
    if (connect) {
      expect(httpResponse.statusCode).toBe(200)
    } else {
      expect(httpResponse.statusCode).toBe(400)
    }
  })
  test('Should return bad request and status 400 if ID UUDI is no valid, in route `getById`', async () => {
    const sut = new UserRouter()
    const id = 'any_id'
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id no has valid UUID')
  })
  test('Should return bad request and status 400 if ID UUDI is null, in route `getById`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.getById(null)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id')
  })
  test('Should return ok and status 200 if ID UUDI is valid, in route `getById`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.getById(id)
    if (connect) {
      expect(httpResponse.statusCode).toBe(200)
    } else {
      expect(httpResponse.statusCode).toBe(400)
    }
  })
  test('Should return ok and status 404 if ID UUDI is valid, in route `getById`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.getById('29dce64f-c28e-41c0-8cfe-d7c8537009a7')
    if (connect) {
      expect(httpResponse.statusCode).toBe(404)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })
  test('Should return ok and status 404 if ID UUDI is valid, in route `getUserByEmail `', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.getUserByEmail('any_valid_email@email.com')
    if (connect) {
      expect(httpResponse.statusCode).toBe(404)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })
  test('Should return ok and status 400 if email not provided, in route `getUserByEmail `', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.getUserByEmail()
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return ok and status 200 if valid email provided, in route `getUserByEmail `', async () => {
    const sut = new UserRouter()
    if (connect) {
      const httpResponse = await sut.getUserByEmail(defaulReturn.email)
      expect(httpResponse.statusCode).toBe(200)
    }
  })
  test('Should return ok and status 404 if email is valid but not found, in route `changePassword`', async () => {
    const sut = new UserRouter()
    const email = faker.internet.email()
    const hHttpRequest = {
      oldPassword: 'old_password',
      newPassword: 'new_password'
    }
    const httpResponse = await sut.changePassword(email, hHttpRequest)
    if (connect) {
      expect(httpResponse.statusCode).toBe(404)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })
  test('Should return ok and status 404 if email is invalid, in route `changePassword`', async () => {
    const sut = new UserRouter()
    const email = 'any_no_email'
    const hHttpRequest = {
      oldPassword: 'old_password',
      newPassword: 'new_password'
    }
    const httpResponse = await sut.changePassword(email, hHttpRequest)
    if (connect) {
      expect(httpResponse.statusCode).toBe(400)
      expect(httpResponse.error.name).toContain('Missing param: email no has valid')
    }
  })
  test('Should return ok and status 404 if email is not provided, in route `changePassword`', async () => {
    const sut = new UserRouter()
    const hHttpRequest = {
      oldPassword: 'old_password',
      newPassword: 'new_password'
    }
    const httpResponse = await sut.changePassword(null, hHttpRequest)
    if (connect) {
      expect(httpResponse.statusCode).toBe(400)
    }
  })
  test('Should return ok and status 400 if in body no has oldPassowrd, in route `changePassword`', async () => {
    const sut = new UserRouter()
    const email = faker.internet.email()
    const hHttpRequest = {
      newPassword: 'new_password'
    }
    const httpResponse = await sut.changePassword(email, hHttpRequest)
    if (connect) {
      expect(httpResponse.statusCode).toBe(400)
    }
  })
  test('Should return ok and status 400 if in body no has newPassword, in route `changePassword`', async () => {
    const sut = new UserRouter()
    const email = faker.internet.email()
    const hHttpRequest = {
      oldPassword: 'old_password'
    }
    const httpResponse = await sut.changePassword(email, hHttpRequest)
    if (connect) {
      expect(httpResponse.statusCode).toBe(400)
    }
  })
  test('Should return ok and status 400 if body is provided, in route `changePassword`', async () => {
    const sut = new UserRouter()
    const email = faker.internet.email()
    const hHttpRequest = {

    }
    const httpResponse = await sut.changePassword(email, hHttpRequest)
    if (connect) {
      expect(httpResponse.statusCode).toBe(400)
    }
  })

  test('Should return ok and status 400 if email not provided, in route `changePassword`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.changePassword()
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return ok and status 400 if valid email provided bus the password has no match, in route `changePassword`', async () => {
    const sut = new UserRouter()
    if (connect) {
      const email = defaulReturn.email
      const hHttpRequest = {
        oldPassword: 'old_password',
        newPassword: 'new_password'
      }
      const httpResponse = await sut.changePassword(email, hHttpRequest)
      expect(httpResponse.statusCode).toBe(400)
      expect(httpResponse.error.name).toBe('the password has no match')
    }
  })
  test('Should return ok and status 200 if valid email and body, in route `changePassword`', async () => {
    const sut = new UserRouter()
    if (connect) {
      const email = defaulReturn.email
      const hHttpRequest = {
        oldPassword: 'any_hashed_passowrd',
        newPassword: 'any_hashed_passowrd'
      }
      const httpResponse = await sut.changePassword(email, hHttpRequest)
      expect(httpResponse.statusCode).toBe(200)
    }
  })
  test('Should return bad request and status 400 if ID UUDI is no valid, in route `remove`', async () => {
    const sut = new UserRouter()
    const id = 'any_id'
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id no has valid UUID')
  })
  test('Should return bad request and status 400 if ID UUDI is null, in route `remove`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.remove(null)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: id')
  })
  test('Should return not found and status 404 if ID UUDI is valid, in route `remove`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.remove('29dce64f-c28e-41c0-8cfe-d7c8537009a7')
    if (connect) {
      expect(httpResponse.statusCode).toBe(404)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })
  test('Should return bad request and status 200 if ID UUDI is valid, in route `remove`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.remove(id)
    if (connect) {
      expect(httpResponse.statusCode).toBe(204)
    } else {
      expect(httpResponse.statusCode).toBe(400)
    }
  })
  test('Should return 500 if `page` and `size` is no provided, in route `getAll`', async () => {
    const sut = new UserRouter()
    const httpResponse = await sut.getAll()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 400 if `page`  is no provided, in route `getAll`', async () => {
    const sut = new UserRouter()
    const size = 5
    const httpResponse = await sut.getAll(null, size)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: page')
  })
  test('Should return 400 if `size`  is no provided, in route `getAll`', async () => {
    const sut = new UserRouter()
    const page = 5
    const httpResponse = await sut.getAll(page, null)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: size')
  })
  test('Should return 400 if `size` is integer > 0 and `page is NaN`, in route `getAll`', async () => {
    const sut = new UserRouter()
    const page = 'any_not_number'
    const size = 5
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: page')
  })
  test('Should return 400 if `page` is integer > 0 and `size is NaN`, in route `getAll`', async () => {
    const sut = new UserRouter()
    const page = 5
    const size = 'any_not_number'
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.name).toContain('Missing param: size')
  })
  test('Should return 404 if not have register, in route `getAll`', async () => {
    const sut = new UserRouter()
    const page = 3000000000
    const size = 3000000000
    const httpResponse = await sut.getAll(page, size)
    if (connect) {
      expect(httpResponse.statusCode).toBe(200)
      expect(httpResponse.data.limit).toBe(3000000000)
      expect(httpResponse.data.offset).toBe(8999999997000000000)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })
  test('Should return bad request and status 200 if page and size is valid, in route `getAll`', async () => {
    const sut = new UserRouter()
    const page = 1
    const size = 1
    const httpResponse = await sut.getAll(page, size)
    if (connect) {
      expect(httpResponse.statusCode).toBe(200)
      expect(httpResponse.data.rows.length).toBeGreaterThan(0)
    } else {
      expect(httpResponse.statusCode).toBe(500)
    }
  })

  test('Should return 500 if has any error of connection, in route `crerate`', async () => {
    sequelize.close()
    const sut = new UserRouter()
    const httpRequest = {
      name: 'normal',
      email: 'long email',
      password: 'any_password',
      roles: [
        'valid_role_one',
        'valid_role_two',
        'valid_role_three'
      ]
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if has any error of connection, in route `update`', async () => {
    sequelize.close()
    const sut = new UserRouter()
    const httpRequest = {
      name: 'normal',
      email: faker.internet.email(),
      roles: [
        'valid_role_one',
        'valid_role_two',
        'valid_role_three'
      ]
    }
    const id = '00e130cf-e4ea-43b6-8357-97329accd929'
    const httpResponse = await sut.update(id, httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if has any error of connection, in route `getById`', async () => {
    sequelize.close()
    const sut = new UserRouter()
    const id = '00e130cf-e4ea-43b6-8357-97329accd929'
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if has any error of connection, in route `remove`', async () => {
    sequelize.close()
    const sut = new UserRouter()
    const id = '00e130cf-e4ea-43b6-8357-97329accd929'
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if has any error of connection, in route `getAll`', async () => {
    sequelize.close()
    const sut = new UserRouter()
    const page = 1
    const size = 2
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(500)
  })
})

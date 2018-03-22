const sinon = require('sinon')
const { users } = require('../../data')
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
} = require('../../src/app/controllers/userController')

describe('Unit: userController', () => {
  let mockRes
  let res
  let expectData

  beforeEach(() => {
    res = {
      status: () => {},
      send: () => {},
    }
    mockRes = sinon.mock(res)
    expectData = {
      id: 1,
      email: 'inzeptiontang@gmail.com',
      first_name: 'Korrakhod',
      last_name: 'Baiya',
      password: 'hashpassword',
      created_at: 'Thu Mar 22 2018 22:52:52 GMT+0700 (+07)',
      updated_at: 'Thu Mar 22 2018 22:52:52 GMT+0700 (+07)',
    }
  })

  afterEach(() => {
    mockRes.restore()
  })

  describe('<GET> /users/:id', () => {
    it('Get user by ID Success', (done) => {
      const req = {
        params: {
          id: 1,
        },
      }
      mockRes.expects('status').withArgs(200).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'Success',
        data: expectData,
      }).once().returnsThis()

      getUserById(req, res)
      mockRes.verify()
      done()
    })

    it('Get user by ID Failed', (done) => {
      const req = {
        params: {
          id: 111,
        },
      }
      mockRes.expects('status').withArgs(204).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'No Content',
      }).once().returnsThis()

      getUserById(req, res)
      mockRes.verify()
      done()
    })
  })

  describe('<GET> /users', () => {
    it('Get users Success', (done) => {
      const req = {}
      mockRes.expects('status').withArgs(200).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'Success',
        data: users,
      }).once().returnsThis()

      getAllUsers(req, res)
      mockRes.verify()
      done()
    })

    it('Get users Failed', (done) => {
      const req = {}
      users.length = 0
      mockRes.expects('status').withArgs(422).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'Unprocessable Entity.',
      }).once().returnsThis()

      getAllUsers(req, res)
      mockRes.verify()
      done()
    })
  })

  describe('<POST> /users', () => {
    it('Create user Success', (done) => {
      const req = {
        body: {
          email: 'test@test.com',
          first_name: 'test',
          last_name: 'test',
          password: 'testtest',
        },
      }
      mockRes.expects('status').withArgs(201).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'Created.',
      }).once().returnsThis()

      createUser(req, res)
      mockRes.verify()
      done()
    })
  })

  describe('<POST> /users/login', () => {
    it('Login Success', (done) => {
      const req = {
        body: {
          email: 'test@test.com',
          password: 'testtest',
        },
      }
      mockRes.expects('status').withArgs(200).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'Success.',
        token: 'generated_token',
      }).once().returnsThis()

      userLogin(req, res)
      mockRes.verify()
      done()
    })

    it('Login Failed', (done) => {
      const req = {
        body: {
          email: 'test@test.com',
          password: 'wrongpass',
        },
      }
      mockRes.expects('status').withArgs(401).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'Unauthorized.',
      }).once().returnsThis()

      userLogin(req, res)
      mockRes.verify()
      done()
    })
  })

  describe('<PUT> /users/:id', () => {
    it('Update Success', (done) => {
      const req = {
        params: {
          id: 1,
        },
        body: {
          first_name: 'update_firstname',
        },
      }
      mockRes.expects('status').withArgs(200).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'Success',
        data: users[0],
      }).once().returnsThis()

      updateUser(req, res)
      mockRes.verify()
      done()
    })
  })

  describe('<DELETE> /users/:id', () => {
    it('DELETE user Success', (done) => {
      const req = {
        params: {
          id: 1,
        },
      }
      mockRes.expects('status').withArgs(204).once().returnsThis()
      mockRes.expects('send').withArgs({
        message: 'No Content',
      }).once().returnsThis()

      deleteUser(req, res)
      mockRes.verify()
      done()
    })
  })
})
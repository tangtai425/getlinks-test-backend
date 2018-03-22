'use strict'
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
} = require('./controllers/userController')

const routes = (server) => {
  server.get('/users', getAllUsers)
  server.post('/users', createUser)
  server.get('/users/:id', getUserById)
  server.put('/users/:id', updateUser)
  server.del('/users/:id', deleteUser)
  server.post('/users/login', userLogin)
}

module.exports = routes

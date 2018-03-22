'use strict'
const find = require('lodash.find')
const bcrypt = require('bcrypt')
const { users, logs } = require('../../../data')

const getUserById = (req, res, next) => {
  const findUser = find(users, user => user.id === req.params.id)
  if (findUser) {
    res.status(200)
    res.send({
      message: 'Success',
      data: findUser,
    })
  } else {
    res.status(204)
    res.send({
      message: 'No Content',
    })
  }
}

const getAllUsers = (req, res, next) => {
  if (users.length > 0) {
    res.status(200)
    res.send({
      message: 'Success',
      data: users,
    })
  } else {
    res.status(422)
    res.send({
      message: 'Unprocessable Entity.'
    })
  }
}

const createUser = (req, res, next) => {
  const timestamps = new Date()
  const {
    email,
    first_name,
    last_name,
    password,
  } = req.body

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(422)
      res.send({
        message: 'Unprocessable Entity.'
      })
    }
    users.push({
      id: users.length + 1,
      email,
      first_name,
      last_name,
      password: hash,
      created_at: timestamps,
      updated_at: timestamps,
    })
    res.status(201)
    res.send({
      message: 'Created.',
    })
  })
}

const updateUser = (req, res, next) => {
  const timestamps = new Date()
  const indexOfUserId = parseInt(req.params.id, 10) - 1
  const { first_name, last_name } = req.body
  if (first_name) {
    users[indexOfUserId].first_name = first_name
  }
  if (last_name) {
    users[indexOfUserId].last_name = last_name
  }
  if (first_name || last_name) {
    users[indexOfUserId].updated_at = timestamps
  }
  res.status(200)
  res.send({
    message: 'Success',
    data: users[indexOfUserId],
  })
}

const deleteUser = (req, res, next) => {
  const indexOfUserId = parseInt(req.params.id, 10) - 1
  try {
    users.splice(indexOfUserId, 1)
    res.status(204)
    res.send({
      message: 'No Content',
    })
  } catch (err) {
    res.status(422)
    res.send({
      message: 'Unprocessable Entity.',
    })
  }
}

const userLogin = (req, res, next) => {
  const { email, password } = req.body
  const findUser = find(users, user => user.email === email)
  if (findUser) {
    bcrypt.compare(password, findUser.password, (err, result) => {
      if (result) {
        res.status(200)
        res.send({
          message: 'Success.',
          token: 'generated_token',
        })
      } else {
        res.status(401)
        res.send({
          message: 'Unauthorized.',
        })
      }
    })
  } else {
    res.status(401)
    res.send({
      message: 'Unauthorized.',
    })
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
}

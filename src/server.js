'use strict'

const restify = require('restify')
const routes = require('./app/routes')
const {
  NODE_ENV,
  NODE_PORT,
} = require('./config')

const task = NODE_ENV || 'development'
const nodePort = NODE_PORT || 4000

const server = restify.createServer({
  name: 'restfulAPI-User',
  version: '1.0.0',
})
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.listen(nodePort, () => {
  routes(server)
  console.log('%s listening at %s', server.name, server.url)
})
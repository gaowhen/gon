const express = require('express')

const env = process.env.NODE_ENV || 'development'
const port = process.env.NODE_PORT || '8000'

const app = express()
global.app = app

// middleware
require('./middleware')

// route
require('./route')

let server = app.listen(port, function () {
  let host = server.address().address

  console.log('Sky Arena is on http://%s:%s', host, port)
})

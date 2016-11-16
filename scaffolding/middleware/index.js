const path = require('path')
const zlib = require('zlib')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser)

const staticPath = path.resolve(__dirname, '../static')
const viewPath = path.resolve(__dirname, '../view')

app.use(compression({
  level: zlib.Z_BEST_COMPRESSION,
}))

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse xml
app.use(bodyParser.xml())

app.use((req, res, next) => {
  res.locals.env = process.env.NODE_ENV
  next()
})

app.use('/static/', express.static(staticPath))
app.set('view engine', 'pug')
app.set('views', viewPath)

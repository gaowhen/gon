const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

const agent = new http.Agent({ maxSockets: 100000 })

const connect = require('connect')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const pug = require('pug')
const figlet = require('figlet')

require('shelljs/global')

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./config').dev
const webpackConfig = require('./webpack.dev')

const kill = {}
let subApp
let pids
const SIGNAL = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT']

const pidfile = path.join(__dirname, 'tmp/dev.pid.json')

// 确保只运行一次 callback
function once(cb) {
  let cbcalled = false

  return function _once() {
    if (cb && !cbcalled) {
      cbcalled = true
      cb()
    }
  }
}

function killps(cb) {
  const cbo = once(cb)

  try {
    pids = JSON.parse(fs.readFileSync(pidfile, 'utf8'))

    if (pids.denv) {
      kill.denv(() => {
        if (pids.app) {
          kill.app(cbo)
        } else {
          cbo()
        }
      })
    } else {
      cbo()
    }
  } catch (e) {
    cbo()
  }
}

function spawn() {
	figlet.text('Gon', {
		font: 'univers',
	}, (err, data) => {
		if (err) {
			console.error(err)
			return
		}

		console.log(data)
		console.log('Okay dokey, ready to work…')
	})
  const gulp = path.join(__dirname, '../node_modules/gulp-cli/bin/gulp.js')
  const gulpfile = path.join(__dirname, 'gulpfile.babel.js')

  subApp = exec(`${gulp} --gulpfile ${gulpfile}`, (error, stdout) => {
    // console.log(stdout)
  })

  pids = {
    denv: process.pid.toString(),
    app: subApp.pid.toString(),
  }

  // save pids
  fs.writeFile(pidfile, JSON.stringify(pids), 'utf8', () => {})

  SIGNAL.forEach((signal) => {
    process.removeAllListeners(signal)

    process.on(signal, () => {
      subApp.kill(signal.replace(/quit$/, 'term'))
      process.exit()
    })
  })

  subApp.stdout.setEncoding('utf8')
  subApp.stderr.setEncoding('utf8')
  // subApp.stdout.on('data', process.stdout.write.bind(process.stdout))
  // subApp.stderr.on('data', process.stderr.write.bind(process.stderr))

  subApp.on('exit', (code) => {
    console.log('app.js is killed')

    if (SIGNAL === 'SIGKILl' || SIGNAL === 'SIGQUIt') {
      setTimeout(spawn, 100, SIGNAL === 'SIGQUIt', true)
    } else if (code && subApp.restart) {
      console.log('app.js crashed. will be restarted in 2 second')
      setTimeout(spawn, 2000, false, true)
    }

    subApp = null
  })

  subApp.restart = true
}

function deputy(req, res, opts) {
  const source = `${req.method} ${req.headers.host}${req.url}`
  const port = opts.port ? `:${opts.port}` : ''
  const destination = `${opts.host}${port}`
  console.log(`- proxy ${source} to ${destination}${opts.path}`)

  const _proxy = http.request(opts, (response) => {
    // set response header
    res.writeHead(response.statusCode, response.headers)

    response.pipe(res, { end: true })
  })

  req.pipe(_proxy, { end: true })

  _proxy.on('error', (err) => {
    res.end(err.stack)
  })

  return
}

function proxy(req, res) {
  const hostF2e = config.f2e.split(':')

  const opts = {
    host: hostF2e[0],
    port: hostF2e[1],
    path: req.url,
    method: req.method,
    headers: req.headers,
    agent,
  }

  const uri = url.parse(req.url, true)
  const pathname = uri.pathname

  if (pathname.match(/^\/api\//i)) {
    opts.host = config.api
    opts.port = 80
    opts.path = req.url.replace('/api/', '/')
  }

  if (config.react === '1' && (/lib\/base\.dev\.min\./i).test(pathname)) {
    opts.path = req.url.replace('dev.min', 'dev')
  }

  // proxy request to outside
  Object.keys(config.proxy).map((key) => {
    if (!key.match(/^\//i)) {
      return
    }

    const reg = new RegExp(`^${key.replace('/', '\/')}`, 'i')

    if (pathname.match(reg)) {
      const uri = config.proxy[key].split(':')
      opts.host = uri[0]
      opts.port = uri[1] ? uri[1] : 80
      opts.path = uri[2] ? req.url.replace(key, uri[2]) : req.url
      opts.headers.host = uri[0]
      opts.headers.referer = `//${uri[0]}`
    }

    return
  })

  deputy(req, res, opts)
}

['app', 'denv'].forEach((name) => {
  kill[name] = function _kill(cb) {
    const cbo = once(cb)

    cp.exec(`ps -fp ${pids[name]}`, (error, stdout) => {
      if (stdout.match(/node/i)) {
        cp.exec(`sudo kill ${pids[name]}`, cbo)
      } else {
        cbo()
      }
    })
  }
})

module.exports.start = function () {
  // start app.js
  if (fs.existsSync(pidfile)) {
    killps(spawn)
  } else {
    spawn()
  }

  SIGNAL.forEach((signal) => {
    process.on(signal, () => {
      fs.unlinkSync(pidfile)
      process.exit()
    })
  })

  const dev = connect()

  dev.use(morgan('dev'))

  const compiler = webpack(webpackConfig)

  dev.use(webpackMiddleware(compiler, {
    hot: true,
    watchOptions: {
      aggregateTimeout: 100,
      poll: true,
    },
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      exclude: ['node_modules'],
      chunks: false,
      errorDetails: true,
      cached: true,
    },
    historyApiFallback: true,
  }))

  dev.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))

  // proxy request from outside to app
  dev.use((req, res, next) => {
    if (!('host' in req.headers)) {
      return res.end('no host in header')
    }

    let flag = false

    Object.keys(config.proxy).map((key) => {
      if (key.match(/^\//i)) {
        return
      }

      const reg = new RegExp(`^${key.replace(/\//g, '\\/').replace(/\./g, '\\.')}`, 'i')

      // should proxy outside request directly to the real app
      // if redirecting requests to proxy again, there will be a error of
      // Can't set headers after they are sent
      if (req.headers.host.match(reg)) {
        flag = true
        const hostF2e = config.f2e.split(':')
        const uri = url.parse(req.url, true)

        const opts = {
          host: hostF2e[0],
          port: hostF2e[1],
          path: `${config.proxy[key]}${uri.search}`,
          method: req.method,
          headers: req.headers,
          agent,
        }

        return deputy(req, res, opts)
      }
    })

    if (!flag) {
      return next()
    }
  })

  dev.use((req, res, next) => {
    if (!('host' in req.headers)) {
      return res.end('no host in header')
    }

    const re = new RegExp(`^${config.domain.replace(/./g, '\.')}$`)

    if (req.headers.host.match(re)) {
      return proxy(req, res)
    }

    return next()
  })

  // Using bodyParser before proxy will break the requests with JSON body
  dev.use(bodyParser.urlencoded({ extended: false }))
  dev.use(bodyParser.json())

  // static file
  dev.use(function (req, res, next) {
    if (!/dev/.test(req.url)) {
      return next()
    }

    req.setEncoding('utf8')

    fs.readFile(__dirname + req.url, function (err, file) {
      res.writeHead(200, {
        'Content-Type': 'application/javascript'
      })

      res.end(file)
    })
  })

  dev.use('/', (req, res, next) => {
    const tpl = path.resolve(__dirname, './dev/index.pug')
    const html = pug.renderFile(tpl, {
      pretty: true,
      data: config,
    })

    res.write(html)
    res.end()

    next()
  })

  // TODO
  // dev.use('/docs', (req, res, next) => {
  // })

  dev.use('/f2e', (req, res) => {
    config.f2e = req.body.to
    console.log(`Web is proxyed to ${config.f2e}`)
    res.end()
  })

  dev.use('/react', (req, res, next) => {
    config.react= req.body.to
    console.log(`React is switched to ${config.react === '0' ? 'Dev' : 'Pro'} version`)
    res.end()
  })

  dev.use('/api', (req, res, next) => {
    config.api = req.body.to
    console.log(`API is proxyed to ${config.api}`)
    res.end()
  })

  dev.use((req, res) => {
    res.statusCode = 404
    res.end('Sorry cant find that!')
  })

  // error handler
  dev.use((err, req, res, next) => {
    console.error(err.stack)
    res.statusCode = 500
    res.end('Something broke!')
  })

  http.createServer(dev).listen(80)
}

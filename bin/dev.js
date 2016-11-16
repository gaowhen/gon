'use strict'

const http = require('http')
const cp = require('child_process')
const path = require('path')
const fs = require('fs')
const url = require('url')

const agent = new http.Agent({ maxSockets: 100000 })

const connect = require('connect')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const pug = require('pug')

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('config')
const webpackConfig = require('./webpack.dev')

const kill = {}
let subApp
let pids
const SIGNAL = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT']

const pidfile = './tmp/dev.pid.json'

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
  subApp = cp.exec('npm run dev', (error, stdout) => {
    console.log(stdout)
  })

  pids = {
    denv: process.pid.toString(),
    app: subApp.pid.toString(),
  }

  // save pids
  fs.writeFile(pidfile, JSON.stringify(pids), 'utf8')

  SIGNAL.forEach((signal) => {
    process.removeAllListeners(signal)

    process.on(signal, () => {
      subApp.kill(signal.replace(/QUIT$/, 'TERM'))
      process.exit()
    })
  })

  subApp.stdout.setEncoding('utf8')
  subApp.stderr.setEncoding('utf8')
  subApp.stdout.on('data', process.stdout.write.bind(process.stdout))
  subApp.stderr.on('data', process.stderr.write.bind(process.stderr))

  subApp.on('exit', (code, signal) => {
    console.log('app.js is killed')

    if (signal === 'SIGKILL' || signal === 'SIGQUIT') {
      setTimeout(spawn, 100, signal === 'SIGQUIT', true)
    } else if (code && subApp.restart) {
      console.log('app.js crashed. will be restarted in 2 second')
      setTimeout(spawn, 2000, false, true)
    }

    subApp = null
  })

  subApp.restart = true

  console.log('Starting app.js')
}

function proxy(req, res) {
  const hostF2e = config.dev.hostF2e.split(':')

  let opts = {
    host: hostF2e[0],
    port: hostF2e[1],
    path: req.url,
    method: req.method,
    headers: req.headers,
    agent,
  }

	const uri = url.parse(req.url, true)
	const pathname = uri.pathname

	if (pathname.match(/^\/advertisement\//i)) {
		opts.host = '119.29.43.29'
		opts.port = 80
	}

	if (pathname.match(/^\/api\//i)) {
		opts.host = config.dev.hostApi
		opts.port = 80
    opts.path = req.url.replace('/api/', '/')
	}

  if (config.dev.reactMin === '1' && (/lib\/base\.dev\.min\./i).test(pathname)) {
    opts.path = req.url.replace('dev.min', 'dev')
	}

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

let compiler = webpack(webpackConfig)

dev.use(webpackMiddleware(compiler, {
  hot: true,
  watchOptions: {
    aggregateTimeout: 100,
    poll: true
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
  heartbeat: 10 * 1000
}))

dev.use((req, res, next) => {
  if (!('host' in req.headers)) {
    return res.end('no host in header')
  }

  if (req.headers.host.match(/free\.natapp\.cc$/)) {
    let headers = req.headers
    const uri = url.parse(req.url, true)
    headers.host = 'piaofang.wepiao.com'

    const opts = {
      host: 'piaofang.wepiao.com',
      port: 80,
      path: `/ping${uri.search}`,
      method: req.method,
      headers,
      agent,
    }

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

  if (req.headers.host.match(/^piaofang\.wepiao\.com$/)) {
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

dev.use('/ping', (req, res, next) => {
  let headers = req.headers
  headers.host = 'piaofang.wepiao.com'
  const opts = {
    host: 'piaofang.wepiao.com',
    port: 80,
    path: '/',
    method: req.method,
    headers,
    agent,
  }

  const _proxy = http.request(opts, (response) => {
    // set response header
    res.writeHead(response.statusCode, response.headers)

    response.pipe(res, { end: true })
  })

  req.pipe(_proxy, { end: true })

  _proxy.on('error', (err) => {
    res.end(err.stack)
  })
})

dev.use('/', (req, res, next) => {
	const tpl = path.resolve(__dirname, './dev/index.pug')
	const html = pug.renderFile(tpl, {
		pretty: true,
		data: config.dev,
	})

	res.write(html)
	res.end()

  next()
})

// dev.use('/docs', (req, res, next) => {
// })

dev.use('/f2e', (req, res) => {
  config.dev.hostF2e = req.body.to
  console.log(`f2e switch to ${config.dev.hostF2e}`)
  res.end()
})

dev.use('/react', (req, res, next) => {
  config.dev.reactMin = req.body.to
  console.log(`React version switch to ${config.dev.reactMin === '0' ? '压缩版' : '开发版'}`)
  res.end()
})

dev.use('/api', (req, res, next) => {
  config.dev.hostApi = req.body.to
  console.log(`api switch to ${config.dev.hostApi}`)
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

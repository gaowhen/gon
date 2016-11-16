'use strict'

const url = require('url')
const crypto = require('crypto')
const axios = require('axios')

const getToken = require('../lib/token')

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/ui', function (req, res) {
  res.render('ui/index')
})

app.get('/news', function (req, res) {
  res.render('news/index')
})

app.get('/library', function (req, res) {
  res.render('library/index')
})

app.get('/comparison', function (req, res) {
  res.render('comparsion_select/index')
})

app.get('/comparison_result', function (req, res) {
  res.render('comparsion_result/index')
})
// check signature
app.get('/ping', (req, res) => {
  const uri = url.parse(req.url, true)
  const {
    signature,
    timestamp,
    nonce,
    echostr,
  } = uri.query

  const arr = [nonce, timestamp, 'oasis']
  const str = arr.sort().join('')

  const sha1 = crypto.createHash('sha1')
  const sha1Str = sha1.update(str).digest('hex')

  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end((sha1Str === signature) ? echostr : '')

  return res
})

// receive messages
app.post('/ping', (req, res) => {
  console.log(req.body.xml)
  res.end('success')
})

app.get('/upload', (req, res) => {
  getToken().then((token) => {
		const url = `https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=${token}`

		axios.post(url, {
			"articles": [
				{
					"thumb_media_id": "hS9lKaEZ1jJXWZT79ulq0lISbI_TAr2lVBazpq5HZesDS5ZwpQ1PZf51zpgfrqcd",
					"author": "gaowhen",
					"title": "Hello Wrold!",
					"content_source_url": "piaofang.wepiao.com",
					"content": "<a href=\"http://piaofang.wepiao.com/\">图文消息，一个图文消息支持1到8条图文</a>",
					"digest": "digest",
					"show_cover_pic": 1
				},
				{
					"thumb_media_id": "hS9lKaEZ1jJXWZT79ulq0lISbI_TAr2lVBazpq5HZesDS5ZwpQ1PZf51zpgfrqcd",
					"author": "Miko Gao",
					"title": "Happy Day",
					"content_source_url": "gaowhen.com",
					"content": "<a href=\"http://piaofang.wepiao.com/\">图文消息，一个图文消息支持1到8条图文</a>",
					"digest": "digest",
					"show_cover_pic": 0
				}
			]
		})
		.then((response) => {
			console.log(response.data)
			const url = `https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=${token}`
			axios.post(url, {
				"filter": {
					"is_to_all": true,
				},
				"mpnews":{
					"media_id": "8krk-_IXf34bGH5BGHb66kVYY_TeajS0R2awdNHWvwucPDP8oXq1hoAIqhBf0O4G",
				},
				"msgtype": "mpnews",
			})
			.then((response) => {
				console.log(response.data)
				res.end('success')
			})
		})
  })
})

app.use(function(req, res, next) {
	res.status(404).send('Sorry cant find that!')
})

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

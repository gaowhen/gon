const Redis = require('ioredis')
const axios = require('axios')

const redis = new Redis(6379)

const APPID = 'wx80bdf53ff6132e9c'
const APPSECRET = '37049aa618b5828d2598e78f851558f8'

async function getToken() {
  let token = ''

  if (process.env.NODE_ENV !== 'production') {
    token = await redis.get('oasis:token')

    if (token) {
      return token
    }

    let res

    try {
      res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`)
    } catch (err) {
      console.error(err)
    }

    token = res.data.access_token

    redis.set('oasis:token', token)
    redis.expire('oasis:token', res.data.expires_in)

    return token
  }

  let tokenServer

  try {
    tokenServer = await axios.get('http://commoncgi.intra.wepiao.com/wxtoken/getToken.php?channelId=513')
  } catch (err) {
    console.error(err)
  }

  token = tokenServer.data.data

  return token
}

module.exports = exports = getToken

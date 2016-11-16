const isWechat = (/micromessenger/i).test(navigator.userAgent)

const isIOS = () => {
  const ua = navigator.userAgent
  return ua.match(/iPad/i) || ua.match(/iPhone/i) || ua.match(/iPod/i)
}

const isAndroid = () => navigator.userAgent.match(/Android/i)

const getDevice = () => {
  let isApp = false
  let isOtherApp = false
  let version = 0
  let platform = 'web'
  let uastr = ''

  const ua = navigator.userAgent

  const isIOSApp = ua.match(/Wepiao_iPhone_Piaofang/)
  const isAndroidApp = ua.match(/Wepiao_Android_Piaofang/)
  const isWepiaoerApp = ua.match(/wepiao/)
  const isQQApp = ua.match(/QQ/)

  if (isIOS()) {
    platform = 'iOS'
  }

  if (isAndroid()) {
    platform = 'Android'
  }

  if (isIOSApp) {
    isApp = true
    platform = 'iOS'

    uastr = ua.split('Wepiao_iPhone_Piaofang/')

    if (uastr.length) {
      version = uastr[1].split('/')[0]
    }
  }

  if (isAndroidApp) {
    isApp = true
    platform = 'Android'

    uastr = ua.split('Wepiao_Android_Piaofang/')

    if (uastr.length) {
      version = uastr[1].split('/')[0]
    }
  }

  if (isWepiaoerApp || isQQApp) {
    isOtherApp = true
  }

  return {
    isApp,
    isOtherApp,
    isWechat,
    version,
    platform,
  }
}

export default getDevice

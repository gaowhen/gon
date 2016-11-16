function wxShare(shareParam) {
  function getcap(force, debug) {
    reqwest({
      url: '//wxtoken.wepiao.com/CreateJsApiTicket.php',
      type: 'jsonp',
      data: {
        url: location.href,
        force,
        callback: 'jsonp',
      },
    }).then((resp) => {
      if (resp.ret === 0) {
        const data = resp.data

        wx.config({
          debug, // 如果在测试环境可以设置为true，会在控制台输出分享信息；
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填
        })

        wx.error((res) => {
          if (res.errMsg !== 'config:ok') {
            getcap(1, false)
          }
        })

        const _param = {
          title: shareParam.title || '', // 分享标题
          link: shareParam.link || '', // 分享链接
          imgUrl: shareParam.imgUrl || '', // 分享图标
          desc: shareParam.desc || '', // 分享描述,分享给朋友时用
          type: shareParam.type || 'link', // 分享类型,music、video或link，不填默认为link,分享给朋友时用
          dataUrl: shareParam.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空,分享给朋友时用
          callback: shareParam.callback || function callback() {}, // 分享回调
        }

        wx.ready(() => {
          wx.showOptionMenu({
            menuList: [
              'menuItem:share:appMessage',
              'menuItem:share:timeline',
            ],
          })

          wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems'],
          })

          // 分享到朋友圈
          wx.onMenuShareTimeline({
            title: _param.title,
            link: _param.link,
            imgUrl: _param.imgUrl,
            success: () => _param.callback(),
          })

          // 分享给朋友
          wx.onMenuShareAppMessage({
            title: _param.title,
            desc: _param.desc,
            link: _param.link,
            imgUrl: _param.imgUrl,
            dataUrl: _param.dataUrl,
            success: () => _param.callback(),
          })
        })
      }
    })
  }

  getcap(0, false)
}

function share({
  title = '实时票房榜-娱票儿票房分析，透过数据看电影',
  link = location.href,
  desc = 'piaofang.wepiao.com',
  imgUrl = '//piaofang.wepiao.com/icon/logo180.png',
  dataUrl = '',
  callback = () => {},
}) {
  wxShare({
    title,
    link,
    desc,
    imgUrl,
    dataUrl,
    callback,
  })
}

export default share

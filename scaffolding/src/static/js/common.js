import 'css/common.styl'

import 'js/common/_href'
import _ga from 'js/common/_ga'
import Gon from 'js/common/_gon'

import {} from 'js/const/_cachekey_const'

import getDevice from 'js/util/_device'
import parseURL from 'js/util/_uri'

import AppShare from 'js/component/global/_appshare'

window.Gon = Gon

_ga()

if (window.ga) {
  Gon.ga = ({
    category, // 通常是用户与之互动的对象
    label = Gon.page, // 用于对事件进行分类
    action = 'click', // 互动类型
    value = 1, // 与事件相关的数值
  }) =>
    window.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
    })
}

const uri = parseURL()

if (uri.params && uri.params.lang) {
  localStorage.setItem('language', uri.params.lang)
}

const lang = window.lang = localStorage.getItem('language') || 'cn'

if (lang === 'cn') {
  fecha.i18n = {
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    amPm: ['上午', '下午'],
  }
}

// global loading
window.loading = {
  loading: document.getElementById('global-loading'),
  show() {
    this.loading.style.display = 'block'
  },
  hide() {
    this.loading.style.display = 'none'
  },
}

window.Storage.prototype.getArray = function getArray(arrayName) {
  let thisArray = []
  const fetchArrayObject = this.getItem(arrayName)

  if (typeof fetchArrayObject !== 'undefined') {
    if (fetchArrayObject !== null) {
      thisArray = JSON.parse(fetchArrayObject)
    }
  }

  return thisArray
}

window.Storage.prototype.pushArrayItem = function pushArrayItem(
  arrayName,
  arrayItem,
  key = 'id',
  limit = 8
) {
  const existingArray = this.getArray(arrayName)
  let idx = -1

  existingArray.forEach((item, index) => {
    if (item[key] === arrayItem[key]) {
      idx = index
    }
  })

  if (idx > -1) {
    existingArray.splice(idx, 1)
  }

  existingArray.unshift(arrayItem)

  if (existingArray.length > limit) {
    existingArray.pop()
  }

  this.setItem(arrayName, JSON.stringify(existingArray))
}

window.fixScroll = function fixScroll(flag) {
  const html = document.querySelector('html')
  const body = document.querySelector('body')

  html.style.overflow = flag ? 'hidden' : ''
  html.style.height = flag ? '100%' : ''
  body.style.overflow = flag ? 'hidden' : ''
  body.style.height = flag ? '100%' : ''
}

window.setCachedHTML = function setCachedHTML(container, key) {
  const node = container
  const cached = sessionStorage.getItem(key)

  if (cached) {
    node.innerHTML = cached
  }
}

window.loading.hide()

const device = getDevice()

if (device.isOtherApp) {
  document.querySelector('body').classList.add('in-other-app')
}

if (device.isApp) {
  document.querySelector('body').classList.add('in-app')
}

const shareWrap = document.getElementById('app-share')

ReactDOM.render(
  <AppShare />,
  shareWrap
)

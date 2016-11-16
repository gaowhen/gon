function getDateStr(_date) {
  const _y = _date.getFullYear()
  let _d = _date.getDate()
  let _m = _date.getMonth() + 1

  _m = _m < 10 ? `0${_m}` : _m
  _d = _d < 10 ? `0${_d}` : _d

  return `${_y}-${_m}-${_d}`
}

class Getdate {
  // 返回今天的日期格式化字符串
  getTodayStr(_format) {
    const _date = Gon.getBjTime()

    if (_format && _format === 'y-d-zh') {
      return `${_date.getMonth() + 1}月${_date.getDate()}日`
    }

    return getDateStr(_date)
  }
}

const getDate = new Getdate()

export default getDate

export function dateDiff(date) {
  const diff = (new Date(Gon.today).getTime() - new Date(Gon.formatDate(date)).getTime()) / 1000

  return Math.floor(diff / 86400)
}

export function getDateDiff(dateOne, dateTwo = Gon.today) {
  const diff = (new Date(dateTwo).getTime() - new Date(Gon.formatDate(dateOne)).getTime()) / 1000

  return Math.floor(diff / 86400)
}


export const zeroize = (num, len = 2) => (num / Math.pow(10, len)).toFixed(len).substr(2)

// 每月第一天是周几
export function getFirstDay(year, month) {
  const firstDay = new Date(year, month - 1, 1)
  return firstDay.getDay()
}

// 当前月总共有多少天
function getMonthLength(year, month) {
  const nextMonth = new Date(year, month, 0)
  return nextMonth.getDate()
}

export function getDays(date) {
  const days = []
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const firstDay = getFirstDay(year, month)
  const monthLength = getMonthLength(year, month)
  // 日历第一行中，当月的日期所占的天数
  const firstRowDays = firstDay === 7 ? 7 : 7 - firstDay
  const daysLeft = monthLength - firstRowDays
  const calViewLength = (Math.ceil(daysLeft / 7) + 1) * 7
  // 前一个月的天数
  const prevMonthLength = getMonthLength(year, month - 1)
  const result = []

  // 前一个月
  for (let i = firstDay - 1; i >= 0; i--) {
    const y = month === 1 ? year - 1 : year
    days.push({
      klas: 'prev',
      date: `${y}-${month === 1 ? 12 : zeroize(month - 1)}-${zeroize(prevMonthLength - i)}`,
      day: prevMonthLength - i,
    })
  }

  // 当前月
  for (let i = 1; i <= monthLength; i++) {
    days.push({
      klas: 'curr',
      date: `${year}-${zeroize(month)}-${zeroize(i)}`,
      day: i,
    })
  }

  // 下一个月
  for (let i = 1; i <= calViewLength - monthLength - firstDay; i++) {
    const y = month === 12 ? year + 1 : year
    days.push({
      klas: 'next',
      date: `${y}-${month === 12 ? 1 : zeroize(month + 1)}-${zeroize(i)}`,
      day: i,
    })
  }

  for (let i = 0; i < days.length; i += 7) {
    result.push(days.slice(i, i + 7))
  }

  return result
}

export function minuteDiff(date) {
  // date is YYYY-MM-DDThh:mm:ss
  // should convert to UTC
  const d = new Date(date)
  const time = new Date(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds()
  )
  const now = Gon.getBjTime()

  return Math.abs(Math.round((now - time) / 60 / 1000))
}

export function getBjTime() {
  const d = new Date()
  const bjTime = new Date()
  const hours = bjTime.getHours()

  // 东区的 timezoneoffset 为负值，转换一下
  const timezone = -d.getTimezoneOffset() / 60
  const offset = timezone - 8

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
  bjTime.setHours(hours - offset)

  return bjTime
}

// 替换内置 Date Constructor，参数格式和 Date 一致
// 推荐使用场景：
// 1. 接受参数为 String 类型时，自动处理浏览器兼容性问题
// 2. 获取当前时间，自动转成北京时间
export function CDate(...arg) {
  // 非 new 调用时返回当前北京时间字符串
  if (this === window.Gon) {
    return getBjTime().toString()
  }

  const firstArg = arg[0]
  if (typeof firstArg === 'string') {
    return new Date(firstArg.replace('T', ' ').replace(/-/g, '/'))
  } else if (firstArg) {
    return new Date(...arg)
  }

  return getBjTime()
}

// @params
// date: required，和 Date 参数格式一致
// offset: optional，Number 类型，表示相对天数，-1 表示往前一天，1 表示往后一天，默认为 0
// format: optional，符合 fecha format 格式要求
//
// @return: String 类型，日期字符串
export function formatDate(date, {
  offset = 0,
  format = 'YYYY-MM-DD',
} = {}) {
  const newDate = new CDate(date).getTime() + 24 * 60 * 60 * 1000 * offset

  return fecha.format(newDate, format)
}

// @params
// date: requred, 和 Date 参数格式一致
// month: required, 可以是数字，1-12，或者 Date Object
export function isDateInMonth(date, month) {
  let monthNumber
  if (typeof month === 'number') {
    monthNumber = month
  } else if (Object.prototype.toString.call(month) === '[object Date]') {
    monthNumber = month.getMonth() + 1
  } else {
    throw new Error('month param should be Number or Date Object format')
  }

  const currentMonthNumber = new Gon.Date(date).getMonth + 1
  return (monthNumber - 1) < currentMonthNumber && currentMonthNumber < monthNumber
}

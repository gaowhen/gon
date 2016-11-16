export const formatComma = (number) => `${number}`.replace(/\B(?=(?:\d{3})+\b)/g, ',')

export const formatUnit = (number) => {
  const num = parseFloat(number)

  if (num > 9999) {
    return {
      value: (num / 10000).toFixed(2),
      unit: '亿',
    }
  }

  return {
    value: num.toFixed(1),
    unit: '万',
  }
}

// 单位为 1
// 根据 unit 即'B'，'M'型统一处理，不按数值大小区分
// 如果不传 unit，则根据数值大小自动转换
// 并根据当前语言返回相应
export const getWithUnit = (number, {
  unit,
} = {}) => {
  if (number === '-') {
    return {
      value: '-',
      unit: '',
      text: '',
    }
  }

  const num = parseFloat(number)

  if (unit || unit === '') {
    if (window.lang === 'cn') {
      if (unit === '亿') {
        const value = (num / 100000000).toFixed(2)
        return {
          value,
          unit,
          text: value + unit,
        }
      }

      if (unit === '万') {
        const value = (num / 10000).toFixed(1)
        return {
          value,
          unit,
          text: value + unit,
        }
      }
    } else if (window.lang === 'en') {
      if (unit === 'B') {
        const value = (num / 1000000000).toFixed(2)
        return {
          value,
          unit,
          text: value + unit,
        }
      }

      if (unit === 'M') {
        const value = (num / 1000000).toFixed(2)
        const unit = '亿'
        return {
          value,
          unit,
          text: value + unit,
        }
      }
    } else {
      return {
        value: num.toFixed(0),
        unit: '',
        text: '',
      }
    }
  } else {
    if (window.lang === 'cn') {
      if (num > 99999999) {
        const value = (num / 100000000).toFixed(2)
        const unit = '亿'
        return {
          value,
          unit,
          text: value + unit,
        }
      }
      if (num > 9999) {
        const value = (num / 10000).toFixed(1)
        const unit = '万'
        return {
          value,
          unit,
          text: value + unit,
        }
      }
    } else if (window.lang === 'en') {
      if (num > 999999999) {
        const value = (num / 1000000000).toFixed(2)
        const unit = 'B'
        return {
          value,
          unit,
          text: value + unit,
        }
      }

      if (num > 9999) {
        const value = (num / 1000000).toFixed(2)
        const unit = 'M'
        return {
          value,
          unit,
          text: value + unit,
        }
      }
    }
  }

  return {
    value: num.toFixed(0),
    unit: '',
    text: '',
  }
}

import max from 'lodash/max'

const blueGray = '#818388'
const name = window.lang === 'cn' ? '票房趋势' : 'Gross Trend'
const unit = window.lang === 'cn' ? '万' : 'M'

export default ({
  trend,
}) => {
  const today = Gon.today
  const dates = trend.date.map((d) => {
    if (today === d) {
      return window.lang === 'cn' ? '今日' : 'Today'
    }

    return Gon.formatDate(d, { format: 'MM-DD' })
  })

  const boxoffice = window.lang === 'cn'
    ? trend.boxoffice.map((b) => Number((b / 10000).toFixed(1)))
    : trend.boxoffice.map((b) => Number((b / 10000 / 100).toFixed(1)))

  let maxNumber = max(boxoffice)

  // 中文版最大值取百万整数，英文版最大值取最大整数「整数并且为偶数」
  if (maxNumber) {
    // 保证最大值为偶数，不然 echart 不渲染 y 轴坐标数值
    const ceilNumber = Math.ceil(maxNumber)
    const m = ceilNumber % 2 === 0 ? ceilNumber : ceilNumber + 1
    maxNumber = window.lang === 'cn' ? Math.ceil(maxNumber / 100) * 100 : m
  } else {
    maxNumber = 1
  }

  const interval = Math.ceil(maxNumber / 2)

  return {
    tooltip: {
      trigger: 'axis',
      borderColor: '#333',
      padding: [10, 5],
      textStyle: {
        color: '#fff',
        fontSize: 10,
      },
      formatter: (params) => {
        let res = params[0].name

        params.forEach((param) => {
          res += `
          <div style="font-size: 1rem; line-height: 1.8;">
            <span style="display: inline-block;
              width: 80px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              vertical-align: top;">
            ${param.seriesName}
            </span>
            <span>
            ${param.value}${unit}
            </span>
          </div>`
        })

        return res
      },
      axisPointer: {
        type: 'line',
        axis: 'x',
        lineStyle: {
          color: '#fff',
          type: 'solid',
          textStyle: {
            color: '#333',
            fontSize: 10,
          },
        },
      },
    },
    grid: {
      left: '12%',
      right: '10%',
      top: 20,
      bottom: 20,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: blueGray,
          fontSize: 8,
        },
      },
    },
    yAxis: {
      type: 'value',
      max: maxNumber,
      interval,
      name: unit,
      nameGap: 5,
      nameTextStyle: {
        color: blueGray,
        fontSize: 8,
      },
      splitNumber: 2,
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(248, 248, 248, 0.1)',
          type: 'dashed',
          width: 1,
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: blueGray,
          fontSize: 8,
        },
      },
    },
    series: {
      name,
      type: 'line',
      symbol: 'rect',
      symbolSize: 3,
      areaStyle: {
        normal: {
          color: '#3D475B',
        },
      },
      itemStyle: {
        normal: {
          opacity: 0,
        },
      },
      clipOverflow: false,
      lineStyle: {
        normal: {
          color: '#3BABFF',
        },
      },
      data: boxoffice,
    },
  }
}

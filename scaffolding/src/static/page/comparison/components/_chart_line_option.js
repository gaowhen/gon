import { getReleaseText } from 'js/util/_text'
import { getWithUnit } from 'js/util/_number'

const CATEGORY_COLORS = ['#0092FF', '#F1312D', '#00D294', '#FFAA00']
const NUMBER_UNIT = {
  cn: {
    boxoffice: '万',
    showtime: '',
  },
  en: {
    boxoffice: 'M',
    showtime: '',
  },
}

const UNIT = NUMBER_UNIT[window.lang]

function getSeriesStyle(tab, categories, data) {
  // 剔除日期列数据
  data.shift()
  const unit = UNIT[tab]

  return data.map((d, idx) => {
    const color = CATEGORY_COLORS[idx]

    return {
      name: categories[idx],
      type: 'line',
      symbol: 'circle',
      symbolSize: 5,
      label: {
        normal: {
          show: false,
          position: 'top',
        },
      },
      // 折线
      lineStyle: {
        normal: {
          color,
          width: '0.5',
        },
      },
      // 折线拐点
      itemStyle: {
        normal: {
          color,
        },
      },
      data: d.map((number) => getWithUnit(number, { unit }).value),
    }
  })
}

export default ({
  tab,
  categories,
  data,
  showDays,
}) => {
  const unit = UNIT[tab]
  const dataCount = data[0].length

  return {
    animation: true,
    width: '90%',
    tooltip: {
      trigger: 'axis',
      borderColor: '#333',
      padding: [10, 5],
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      position: ['20%', 100],
      textStyle: {
        color: '#333',
        fontSize: 10,
      },
      formatter: (params) => {
        let res = params[0].name

        params.forEach((param, idx) => {
          res += `
          <div style="font-size: 1rem; line-height: 1.8;">
            <span style="display: inline-block;
              width: 100px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              vertical-align: top;">
            ${param.seriesName}
            </span>
            <span style="color: ${CATEGORY_COLORS[idx]};">
            ${param.value}${UNIT[tab]}
            </span>
            <span>
            , ${getReleaseText(showDays[idx] - dataCount + 1 + param.dataIndex)}
            </span>
          </div>`
        })

        return res
      },
      axisPointer: {
        type: 'line',
        axis: 'x',
        lineStyle: {
          color: '#01d195',
          type: 'solid',
          textStyle: {
            color: '#333',
            fontSize: 10,
          },
        },
      },
    },
    grid: {
      y: 40,
      left: '2.5%',
      height: 200,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[0].map((date) => Gon.formatDate(date, { format: 'MM-DD' })),
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#DDD',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#ddd',
          type: 'dotted',
        },
      },
      // 座标点
      axisLabel: {
        textStyle: {
          color: '#999',
          fontSize: 10,
        },
      },
    },
    yAxis: {
      type: 'value',
      name: unit ? `(${unit})` : null,
      splitNumber: 3,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#DDD',
        },
      },
      // 座标点
      axisLabel: {
        textStyle: {
          color: '#999',
          fontSize: 10,
        },
      },
      // 分隔线
      splitLine: {
        lineStyle: {
          color: '#ddd',
          type: 'dotted',
        },
      },
    },
    series: getSeriesStyle(tab, categories, data),
  }
}

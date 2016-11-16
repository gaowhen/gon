function getOption(
  dataX,
  dataSeries,
  animation = true,
  formatter = `{b},{c}${window.lang === 'cn' ? '万' : 'M'}`
) {
  return {
    animation,
    // 提示框
    width: '90%',
    tooltip: {
      trigger: 'axis',
      // position: point => [point[0], '30%'],
      formatter,
      borderColor: '#333',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      textStyle: {
        color: '#333',
        fontsize: 28,
      },
      axisPointer: {
        type: 'line',
        axis: 'x',
        lineStyle: {
          color: '#01d195',
          type: 'solid',
          textStyle: {
            color: '#333',
            fontsize: 28,
          },
        },
      },
    },
    grid: {
      height: '135px',
      top: '25',
      left: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataX,
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
          fontsize: 20,
        },
      },
    },
    yAxis: {
      type: 'value',
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
          fontsize: 20,
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
    series: [
      {
        name: '',
        type: 'line',
        stack: '',
        label: {
          normal: {
            show: false,
            position: 'top',
          },
        },
        // 折线
        lineStyle: {
          normal: {
            color: '#0092ff',
            width: '0.5',
          },
        },
        // 区域填充
        areaStyle: {
          normal: {
            color: '#91dfff',
            opacity: '0.5',
          },
        },
        // 折线拐点
        itemStyle: {
          normal: {
            borderWidth: '0.5',
            color: '#000',
            borderColor: '#0092ff',
          },
        },
        data: dataSeries,
      },
    ],
  }
}

export default getOption

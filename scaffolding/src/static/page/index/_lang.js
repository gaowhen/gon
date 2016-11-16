const LANG_CONFIG = {
  cn: {
    Indicators: {
      boxoffice: '实时票房',
      boxofficeRate: '票房占比',
      scheduleRate: '排片占比',
      seatRate: '上座率',
      showTimes: '场次',
      ticketSeatRate: '排座占比',
      avgPrice: '均价',
      avgPerson: '场均人次',
      tickets: '人次',
    },
    ChartTrend: {
      accuracy: '实时票房准确度 ',
      trend: '近 7 日票房趋势',
    },
    Rank: {
      rank: '排行',
      more: '更多',
    },
    FilterIndicator: {
      more: '更多指标',
      close: '关闭',
      confirm: '确定',
      desc: '请最少选择 4 项',
    },
  },
  en: {
    ChartTrend: {
      accuracy: ' Data Accuracy ',
      trend: '7 Days Gross Trend',
    },
    Rank: {
      rank: 'Rank',
      more: 'More',
    },
    FilterIndicator: {
      more: 'More Indicators',
      close: 'Close',
      confirm: 'Confirm',
      desc: 'Please choose at least 4 indicators',
    },
    Indicators: {
      boxoffice: 'Gross',
      boxofficeRate: 'Gross Share',
      scheduleRate: 'Booking',
      seatRate: 'Attn Rate',
      showTimes: 'Show Times',
      ticketSeatRate: 'Seat Share',
      avgPrice: 'Price',
      avgPerson: 'Attn/show',
      tickets: 'Admission',
    },
  },
}

export default LANG_CONFIG[window.lang]

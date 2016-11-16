const LANG = {
  cn: {
    0: '全部',
    5: '票房报告',
    3: '专题研究',
    1: '行业新闻',
    2: '受众分析',
    4: '影片揭秘',
  },
  en: {
    0: 'All',
    5: 'Box Office Express',
    3: 'Subject Research',
    1: 'Industry News',
    2: 'Viewer Analysis',
    4: 'Movie Discovery',
  },
}

const CATEGORIES = LANG[window.lang]

export { CATEGORIES }

function getCategoryName(category) {
  return CATEGORIES[category]
}

export { getCategoryName }

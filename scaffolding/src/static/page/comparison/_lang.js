const LANG_SELECT_CONFIG = {
  cn: {
    HeadLite: {
      title: '选择对比影片',
    },
    SelectConfirm: {
      confirm: '确 定',
    },
    SelectList: {
      title: '选择对比影片',
      subtitle: '同档期电影',
      tip: '最多选择 4 部电影',
    },
  },
  en: {
    HeadLite: {
      title: 'Select Movies',
    },
    SelectConfirm: {
      confirm: 'OK',
    },
    SelectList: {
      title: 'Select Movies',
      subtitle: 'Same Release Schedule',
      tip: 'Max 4 movies',
    },
  },
}

const LANG_RESULT_CONFIG = {
  cn: {
    HeadLite: {
      title: '影片数据对比',
    },
    ResultTabs: {
      tabs: ['票房数据', '排片数据'],
    },
  },
  en: {
    HeadLite: {
      title: 'Stats Comparison',
    },
    ResultTabs: {
      tabs: ['Box Office', 'Showtimes'],
    },
  },
}

export const LANG_SELECT = LANG_SELECT_CONFIG[window.lang]
export const LANG_RESULT = LANG_RESULT_CONFIG[window.lang]

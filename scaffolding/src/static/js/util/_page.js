import parseURL from 'js/util/_uri'

const PAGES = {
  '/': '首页',
  '/booking': '排片',
  '/cinmeas': '影院',
  '/library': '影库',
  '/mine': '我的',
  '/map': '直播全国',
  '/news': '行业资讯',
  '/movie': '影片详情',
  '/cinema': '影院详情',
  '/theater': '院线详情',
  '/comparison': '选择对比影片',
  '/comparison_result': '影片数据对比',
}

const url = parseURL()
const PAGE = PAGES[url.path] ? PAGES[url.path] : '首页'

export default PAGE

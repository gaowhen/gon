// 切换 head lite 标题
function switchTitle(
  scrollEle,
  nameEle,
  {
    titleEle = '.g-c-head-lite h1',
    threshold = 35,
  } = {}
) {
  const $scroll = $(scrollEle)
  const $name = $(nameEle)

  const $title = $(titleEle)
  const title = $title.text()

  $scroll.on('scroll', () => {
    const name = $name.text()

    if ($scroll.scrollTop() > threshold) {
      $title.text(name)
    } else {
      $title.text(title)
    }
  })
}

export default switchTitle

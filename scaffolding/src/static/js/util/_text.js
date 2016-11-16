export function getReleaseText(showDay) {
  let dayUnit = 'days'
  if (showDay === 0 || showDay === 1) {
    dayUnit = 'day'
  }

  let releaseText
  if (showDay > 0) {
    if (window.lang === 'cn') {
      releaseText = `上映 ${showDay} 天`
    } else {
      releaseText = `${showDay} ${dayUnit}`
    }
  } else {
    if (window.lang === 'cn') {
      releaseText = `距离上映 ${1 - showDay} 天`
    } else {
      releaseText = `In ${1 - showDay} ${dayUnit}`
    }
  }

  return releaseText
}

import THEATER from 'js/const/_theater'

const theaterKeys = Object.keys(THEATER)

const getTheater = (id) => {
  let target = null

  theaterKeys.forEach((item) => {
    THEATER[item].forEach((theater) => {
      if (theater.id === id) {
        target = theater
      }
    })
  })

  return target
}

export default getTheater

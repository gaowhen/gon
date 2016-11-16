import CITY from 'js/const/_city'

const cityKeys = Object.keys(CITY)

const getCity = (id) => {
  let target = null
  let newId
  if (Array.isArray(id)) {
    newId = id.join(',')
  } else {
    newId = String(id)
  }

  cityKeys.forEach((item) => {
    CITY[item].forEach((city) => {
      if (city.cityId === newId) {
        target = city
      }
    })
  })

  return target
}

export default getCity

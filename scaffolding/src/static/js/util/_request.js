import { minuteDiff } from 'js/util/_date'
import { Prefix, CacheDisabled } from 'js/util/_api_const'

function fetch(api, data, isPartial, method) {
  return reqwest({
    url: isPartial ? Prefix + api : api,
    type: 'json',
    method,
    data,
    contentType: 'application/json',
    crossOrigin: true,
  })
    .then((res) => {
      window.loading.hide()

      if (CacheDisabled.indexOf(api) < 0) {
        try {
          sessionStorage.setItem(`${api}:${data}`, JSON.stringify(res))
        } catch (err) {
          sessionStorage.clear()
        }
      }

      return res
    })
}

function request(api, params, isPartial = true, method = 'post') {
  const data = JSON.stringify({ ...params, lang: window.lang })
  // const resp = sessionStorage.getItem(`${api}:${data}`)

  // TODO
  // for dev
  const resp = null

  if (!resp) {
    return fetch(api, data, isPartial, method)
  }

  const json = JSON.parse(resp)

  if (json.dataUpdateLog && json.dataUpdateLog.dataUpdateTime) {
    const time = json.dataUpdateLog.dataUpdateTime

    if (minuteDiff(time) > 20) {
      return fetch(api, data, isPartial, method)
    }
  }

  window.loading.hide()

  return new Promise((resolve) => resolve(json))
}

export default request

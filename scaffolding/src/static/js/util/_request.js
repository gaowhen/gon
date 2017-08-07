import { Prefix } from 'js/util/_api_const'

function fetch(api, data, isPartial, method) {
  return reqwest({
    url: isPartial ? Prefix + api : api,
    type: 'json',
    method,
    data,
    contentType: 'application/json',
    crossOrigin: true,
  })
    .then(res => res)
}

function request(api, params, isPartial = true, method = 'post') {
  const data = JSON.stringify({ ...params, lang: window.lang })

  // TODO
  // for dev
  const resp = null

  if (!resp) {
    return fetch(api, data, isPartial, method)
  }

  const json = JSON.parse(resp)

  window.loading.hide()

  return new Promise((resolve) => resolve(json))
}

export default request

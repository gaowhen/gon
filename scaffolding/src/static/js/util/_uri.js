function parseURL(url = window.location) {
  const a = document.createElement('a')
  a.href = url

  const getParam = () => {
    const ret = {}
    const seg = a.search.replace(/^\?/, '').split('&')
    let s = ''

    for (let i = 0; i < seg.length; i++) {
      if (!seg[i]) {
        continue
      }

      s = seg[i].split('=')
      ret[s[0]] = s[1]
    }

    return ret
  }

  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: getParam(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || ['', ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || ['', ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/'),
  }
}

export default parseURL

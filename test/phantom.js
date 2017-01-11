var page = require('webpage').create()
var url = 'http://127.0.0.1:9000'

page.open(url, function (status) {
  console.log('visit: http://127.0.0.1:9000')
  phantom.exit()
})

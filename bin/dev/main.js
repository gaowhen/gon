$(document).ready(function () {
  var $reactForm = $('#react-form')
  var $apiForm = $('#api-form')
  var $webForm = $('#web-form')

  var config = (function(){
    var configText = $('#config').text()
    return JSON.parse(configText)
  })()

  $apiForm.on('click', 'li', function () {
    var $this = $(this)
    var val = $this.data('val')

    $.post('/api', {
      to: val,
    }).done(function () {
      $this
        .addClass('active')
        .siblings()
          .removeClass('active')
      console.log('API is proxyed to', val)
    })
  })

  $apiForm.find('li').each(function () {
    var $this = $(this)
    var val = $this.data('val')

    if(val === config.api){
      $this.trigger('click')
    }
  })

  $webForm.on('click', 'li', function () {
    var $this = $(this)
    var val = $this.data('val')

    $.post('/f2e', {
      to: val,
    }).done(function () {
      $this
        .addClass('active')
        .siblings()
          .removeClass('active')
      console.log('Web is proxyed to', val)
    })
  })

  $webForm.find('li').each(function () {
    var $this = $(this)
    var val = $this.data('val')

    if(val === config.f2e){
      $this.trigger('click')
    }
  })
})

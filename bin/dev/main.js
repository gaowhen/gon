$(document).ready(function () {
  var $reactForm = $('#react-form')
  var $apiForm = $('#api-form')
  var $nodeForm = $('#node-form')

  var config = (function(){
    var configText = $('#config').text()
    return JSON.parse(configText)
  })()

  $reactForm.on('click', 'input', function () {
    var $input = $(this)

    $.post('/react', {
      to: $input.val()
    }).done(function () {
      var version = $input.val() ? 'Pro' : 'Dev'
      console.log('React version is switched to', version)
    })
  })

  $reactForm.find('input').each(function () {
    var $input = $(this)

    if($input.val() === config.react){
      $input.trigger('click')
    }
  })

  $apiForm.on('click', 'input', function () {
    var $input = $(this)

    $.post('/api', {
      to: $input.val()
    }).done(function () {
      console.log('API is proxyed to', $input.val())
    })
  })

  $apiForm.find('input').each(function () {
    var $input = $(this)

    if($input.val() === config.api){
      $input.trigger('click')
    }
  })

  $nodeForm.on('click', 'input', function () {
    var $input = $(this)

    $.post('/f2e', {
      to: $input.val(),
    }).done(function () {
      console.log('Web is proxyed to', $input.val())
    })
  })

  $nodeForm.find('input').each(function () {
    var $input = $(this)

    if($input.val() == config.f2e){
      $input.trigger('click')
    }
  })
})

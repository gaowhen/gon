$(document).ready(function () {
  var $reactForm = $('#react-form')
  var $apiForm = $('#api-form')
  var $nodeForm = $('#node-form')
  // $fastForm = $('#fast-form')

  var config = (function(){
    var configText = $('#config').text()
    return JSON.parse(configText)
  })()

  $reactForm.on('click', 'input', function () {
    var $input = $(this)

    $.post('/react', {
      to: $input.val()
    }).done(function () {
      console.log('React 版本已切换到', $input.val())
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
      console.log('api 已切换到', $input.val())
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
      console.log('f2e 已切换到', $input.val())
    })
  })

  $nodeForm.find('input').each(function () {
    var $input = $(this)

    if($input.val() == config.f2e){
      $input.trigger('click')
    }
  })
})

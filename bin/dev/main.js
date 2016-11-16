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

    if($input.val() === config.reactMin){
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

    if($input.val() === config.hostApi){
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

    if($input.val() == config.hostF2e){
      $input.trigger('click')
    }
  })
  //
  // $fastForm.find('input').on('click', function () {
  //   var $input = $(this),
  //     index = $input.data('index')
  //
  //   $apiForm.find('input').eq(index).trigger('click')
  //   $nodeForm.find('input').eq(index).trigger('click')
  // })
})

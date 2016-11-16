$('body').on('click', 'a', function (e) {
  if ($(this).attr('href') === '#') {
    e.preventDefault()
  }
})

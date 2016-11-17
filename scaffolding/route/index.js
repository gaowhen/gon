app.get('/', function (req, res) {
  res.render('index')
})

app.use(function(req, res, next) {
	res.status(404).send('Sorry cant find that!')
})

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

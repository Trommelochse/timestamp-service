var express = require('express')
var app = express()

app.get("/", (req, res) => {
  res.send('Please provide a valid string to process.')
})

app.get("/:timeString", (req, res) => {
  const { timeString } = req.params
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  
  if (parseInt(timeString) && timeString.match(/^[0-9]*$/)) {
    const date = new Date(timeString * 1000) 
    if (date) {
      const dateString = date.toLocaleDateString('en-US', options)
      if (dateString === 'Invalid Date') {
        res.json({
          unix: null,
          natural: null
        })
      }
      res.json({
        unix: date.getTime() / 1000,
        natural: dateString.replace(/^[a-zA-Z]*,\s/, '')
      })
    }
  }
  else if (new Date(timeString).getTime()) {
    const date = new Date(timeString)
    const dateString = date.toLocaleDateString('en-US', options)
    res.json({
      unix: date.getTime() / 1000,
      natural: dateString.replace(/^[a-zA-Z]*,\s/, '')
    })
  }
  else {
    res.json({
      unix: null,
      natural: null
    })
  }
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + listener.address().port)
});

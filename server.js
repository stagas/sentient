var express = require('express')
var f = require('frequire')(__dirname)

f.expose(f.node().js)

f.require('sentient')
f.require('jquery')
f.require('game')

f.expose(function () {
  var $ = require('jquery')
  window.game = require('game')
  $(function () { game.start() })
})

var app = express()

app.use(f.middleware())

app.get('/', function (req, res) {
  res.send('<html><head><link rel="stylesheet" href="/wrapped.css"><script src="/wrapped.js"></script></head><body></body></html>')
})

app.listen(8080)

var $ = require('jquery')

module.exports = function (game) {
  var keys = []

  function emit () {
    game.emit('keys', keys)
  }

  $('html').on('keydown', function (ev) {
    if (~keys.indexOf(ev.which)) return
    keys.push(ev.which)
    emit()
  })

  $('html').on('keyup', function (ev) {
    keys.splice(keys.indexOf(ev.which), 1)
    emit()
  })
}

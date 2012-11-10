var $ = require('jquery')
var V = require('./v')

module.exports = function (game) {
  game.use('mouse')
  game.mouse = { pos: V(0,0) }

  function emit () {
    var events = [].slice.call(arguments)
    return function (e) {
      for (var i = 0, len = events.length; i < len; i++) {
        if (events[i]) e.emit(events[i], game.mouse)
      }
      return e
    }
  }

  $('html').mousemove(function (ev) {
    ev.preventDefault()
    game.mouse.pos.set(ev.clientX, ev.clientY)
    game.entitiesOf('mouse').forEach(emit('mousemove'))
    return false
  })

  $('html').click(function (ev) {
    ev.preventDefault()
    game.entitiesOf('mouse').forEach(emit('mouseclick'))
    return false
  })

  $('html').mousedown(function (ev) {
    ev.preventDefault()
    game.mouse.down = true
    game.entitiesOf('mouse').forEach(emit('mousedown'))
    return false
  })

  $('html').mouseup(function (ev) {
    ev.preventDefault()
    game.mouse.down = false
    game.entitiesOf('mouse').forEach(emit('mouseup'))
    return false
  })
}

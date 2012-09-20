var V = require('./v')

// box helper
function Box (nw, se) {
  return { nw: V(nw), se: V(se) }
}

module.exports = function (game) {
  var box = Box([0,0],[500,500])
  game.on('update', function (a) {
    game.entitiesOf('spaceship').forEach(function (e) {
      e.pos.keepIn(e.size, box)
    })
  })
}
